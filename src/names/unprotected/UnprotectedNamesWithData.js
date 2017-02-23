import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import { showCreateNameForm, selectUnprotectedName } from '../nameActions';
import GetUnprotectedNames from './GetUnprotectedNames.gql';

import UnprotectedNames from './UnprotectedNames';

const removeNameFromUnprotected = (previousResult, unprotectedNameToRemoveId) => {
  const removedNamePosition = previousResult.user.unprotected.findIndex(
    ({ id }) => id === unprotectedNameToRemoveId
  );

  return {
    user: {
      ...previousResult.user,
      unprotected: [
        ...previousResult.user.unprotected.slice(0, removedNamePosition),
        ...previousResult.user.unprotected.slice(removedNamePosition + 1)
      ]
    }
  };
};

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveUnprotectedName':
        if (
          _.has(action, 'result.data.removeUnprotectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromUnprotected(
            previousResult, action.variables.unprotectedId
          );
        }
        break;
      case 'ProtectName':
        if (
          _.has(action, 'result.data.protectNameToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromUnprotected(
            previousResult, action.variables.unprotectedId
          );
        }
        break;
      case 'CreateUnprotectedName':
        if (
          _.has(action, 'result.data.addUnprotectedNameToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return {
            user: {
              ...previousResult.user,
              unprotected: [
                action.result.data.addUnprotectedNameToUser,
                ...previousResult.user.unprotected
              ]
            }
          };
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const UnprotectedNamesWithData = graphql(GetUnprotectedNames, {
  options: ({ id }) => ({ variables: { id }, reducer }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.unprotected,
    ...ownProps
  })
})(UnprotectedNames);

const mapStateToProps = state => ({
  id: state.profile.id,
  selectedNameDrawerOpen: state.name.selectedUnprotected !== false,
  showingCreateForm: state.name.showingCreateForm,
  nameActionInProgress: state.name.actionInProgress
});

const mapDispatchToProps = (dispatch) => ({
  showCreateNameForm: () => dispatch(showCreateNameForm()),
  selectUnprotectedName: (index) => dispatch(selectUnprotectedName(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnprotectedNamesWithData);
