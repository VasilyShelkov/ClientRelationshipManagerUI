import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import GetProtectedNames from './GetProtectedNames.gql';
import GetMetWithProtectedNames from './GetMetWithProtectedNames.gql';
import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import { changeShownProtectedList } from '../nameActions';

import ProtectedNamesLayout from './ProtectedNamesLayout';
import { removeNameFromList } from '../nameListShapeShifter';

const reducer = (nameListType) => (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveProtectedName':
        if (
          _.has(action, 'result.data.removeProtectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.protectedId, nameListType
          );
        }
        break;
      case 'UnprotectName':
        if (
          _.has(action, 'result.data.unprotectNameFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.nameId, nameListType, true
          );
        }
        break;
      case 'MakeClient':
        if (
          _.has(action, 'result.data.addClientToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.nameId, nameListType, true
          );
        }
        break;
      case 'MetWithProtected':
        if (
          _.has(action, 'result.data.editProtectedName') &&
          !_.has(action, 'result.errors')
        ) {
          if (nameListType === 'metWithProtected') {
            return {
              ...previousResult,
              user: {
                ...previousResult.user,
                metWithProtected: [
                  action.result.data.editProtectedName,
                  ...previousResult.user.metWithProtected
                ]
              }
            };
          }

          return removeNameFromList(
            previousResult, action.variables.protectedId, nameListType
          );
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
  })
)(ProtectedNamesLayout);

const mapStateToProps = state => ({
  id: state.account.id,
  selectedNameId: state.name.selectedName,
  listToShow: state.name.protectedListToShow
});

const mapDispatchToProps = dispatch => ({
  changeShownProtectedList: (listToShow) => dispatch(changeShownProtectedList(listToShow))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedNames);

