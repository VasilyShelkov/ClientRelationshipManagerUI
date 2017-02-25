import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import { selectProtectedName } from '../nameActions';
import GetProtectedNames from './GetProtectedNames.gql';

import ProtectedNames from './ProtectedNames';
import { removeNameFromList } from '../nameListShapeShifter';

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveProtectedName':
        if (
          _.has(action, 'result.data.removeProtectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.protectedId, 'protected'
          );
        }
        break;
      case 'MakeClient':
        if (
          _.has(action, 'result.data.addClientToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.nameId, 'protected', true
          );
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const ProtectedNamesWithData = graphql(GetProtectedNames, {
  options: ({ id }) => ({ variables: { id }, reducer }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.protected,
    ...ownProps
  })
})(ProtectedNames);

const mapStateToProps = state => ({
  id: state.account.id,
  selectedNameDrawerOpen: state.name.selectedProtected !== false,
  selectedNamePosition: state.name.selectedProtected,
  nameActionInProgress: state.name.actionInProgress
});

const mapDispatchToProps = (dispatch) => ({
  selectProtectedName: (index) => dispatch(selectProtectedName(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedNamesWithData);

