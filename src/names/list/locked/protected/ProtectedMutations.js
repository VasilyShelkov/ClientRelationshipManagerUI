import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';
import _ from 'lodash';

import BookCall from './BookCall.gql';
import BookMeeting from './BookMeeting.gql';
import GetNameComments from '../../../selected/comments/GetNameComments.gql';

import { onSubmitBookCall, onSubmitBookMeeting } from '../lockedMutations';
import { showNotification } from '../../../../app/appActions';
import { performingNameAction } from '../../../nameActions';
import NamesList from '../../NamesList';

const LockedNamesWithMutations = compose(
  graphql(BookCall, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookCall: onSubmitBookCall({
        mutate,
        userId: ownProps.userId,
        names: ownProps.names,
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
            userId: props.userId,
            id: props.selectedNameId
          }
        }
      ]
    })
  }),
  graphql(BookMeeting, {
    props: ({ ownProps, mutate }) => ({
      onSubmitBookMeeting: onSubmitBookMeeting({
        mutate,
        userId: ownProps.userId,
        names: ownProps.names,
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
            userId: props.userId,
            id: props.selectedNameId
          }
        }
      ]
    })
  })
)(NamesList);

const mapStateToProps = state => ({
  selectedNameId: state.selectedName.nameId,
  editProtectedNameCallDialogOpen: state.name.editProtectedNameCallDialogOpen,
  editProtectedNameMeetingDialogOpen: state.name.editProtectedNameMeetingDialogOpen
});

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500))
});

export default connect(mapStateToProps, mapDispatchToProps)(LockedNamesWithMutations);
