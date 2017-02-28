import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import StandardProtectedNamesWithData from './StandardProtectedNamesWithData';

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
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const MetWithProtectedNames = graphql(GetClients, {
  options: ({ id }) => ({ variables: { id }, reducer }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.metWithProtected,
    ...ownProps
  })
})(StandardProtectedNamesWithData);

const mapStateToProps = state => ({
  id: state.account.id,
});

export default connect(mapStateToProps)(MetWithProtectedNames);

