import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import { red500 } from 'material-ui/styles/colors';

import GetProtectedNames from './GetProtectedNames.gql';
import GetProtectedNamesLimit from './GetProtectedNamesLimit.gql';
import GetMetWithProtectedNames from './GetMetWithProtectedNames.gql';
import BookCall from './BookCall.gql';
import BookMeeting from './BookMeeting.gql';
import GetNameComments from '../../../selected/comments/GetNameComments.gql';

import { onSubmitBookCall, onSubmitBookMeeting } from '../lockedMutations';
import { APOLLO_MUTATION_RESULT } from '../../../../app/thirdPartyActions';
import { performingNameAction } from '../../../nameActions';
import { changeShownProtectedList } from '../../nameListActions';
import { showNotification } from '../../../../app/appActions';

import ProtectedNamesLayout from './ProtectedNamesLayout';
import { removeNameFromList } from '../../nameListShapeShifter';

const reducer = nameListType => (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveProtectedName':
        if (_.has(action, 'result.data.removeProtectedFromUser') && !_.has(action, 'result.errors')) {
          return removeNameFromList(previousResult, action.variables.protectedId, nameListType);
        }
        break;
      case 'UnprotectName':
        if (_.has(action, 'result.data.unprotectNameFromUser') && !_.has(action, 'result.errors')) {
          return removeNameFromList(previousResult, action.variables.nameId, nameListType, true);
        }
        break;
      case 'MakeClient':
        if (_.has(action, 'result.data.addClientToUser') && !_.has(action, 'result.errors')) {
          return removeNameFromList(previousResult, action.variables.nameId, nameListType, true);
        }
        break;
      case 'MetWithProtected':
        if (_.has(action, 'result.data.editProtectedName') && !_.has(action, 'result.errors')) {
          if (nameListType === 'metWithProtected') {
            return {
              ...previousResult,
              user: {
                ...previousResult.user,
                metWithProtected: [action.result.data.editProtectedName, ...previousResult.user.metWithProtected]
              }
            };
          }

          return removeNameFromList(previousResult, action.variables.protectedId, nameListType);
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const ProtectedNames = compose(
  graphql(GetProtectedNames, {
    options: ({ id }) => ({
      variables: { id },
      reducer: reducer('protected')
    }),
    props: ({ ownProps, data: { loading, user } }) => ({
      loadingProtected: loading,
      protectedNames: user && user.protected,
      ...ownProps
    })
  }),
  graphql(GetProtectedNamesLimit, {
    options: ({ id }) => ({ variables: { id } }),
    props: ({ ownProps, data: { user } }) => ({
      protectedNamesLimit: user && user.protectedNamesLimit,
      ...ownProps
    })
  }),
  graphql(GetMetWithProtectedNames, {
    options: ({ id }) => ({
      variables: { id },
      reducer: reducer('metWithProtected')
    }),
    props: ({ ownProps, data: { loading, user } }) => ({
      loadingMetWithProtected: loading,
      metWithProtectedNames: user && user.metWithProtected,
      ...ownProps
    })
  }),
  graphql(BookCall, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookCall: names =>
        onSubmitBookCall({
          mutate,
          userId: ownProps.id,
          names,
          editCallDialogOpen: ownProps.editProtectedNameCallDialogOpen,
          nameListTypeIdKey: 'protectedId',
          performingNameAction: ownProps.performingNameAction,
          showErrorNotification: ownProps.showErrorNotification
        }),
      ...ownProps
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.id,
            id: props.selectedNameId
          }
        }
      ]
    })
  }),
  graphql(BookMeeting, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookMeeting: names =>
        onSubmitBookMeeting({
          mutate,
          userId: ownProps.id,
          names,
          editMeetingDialogOpen: ownProps.editProtectedNameMeetingDialogOpen,
          nameListTypeIdKey: 'protectedId',
          performingNameAction: ownProps.performingNameAction,
          showErrorNotification: ownProps.showErrorNotification
        }),
      ...ownProps
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.id,
            id: props.selectedNameId
          }
        }
      ]
    })
  })
)(ProtectedNamesLayout);

const mapStateToProps = state => ({
  id: state.account.id,
  selectedNameId: state.selectedName.id,
  listToShow: state.nameList.protectedListToShow,
  editProtectedNameCallDialogOpen: state.name.editProtectedNameCallDialogOpen,
  editProtectedNameMeetingDialogOpen: state.name.editProtectedNameMeetingDialogOpen
});

const mapDispatchToProps = dispatch => ({
  changeShownProtectedList: listToShow => dispatch(changeShownProtectedList(listToShow)),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedNames);
