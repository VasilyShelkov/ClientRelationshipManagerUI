import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import GetClients from './GetClients.gql';
import StandardProtectedNamesWithData from './StandardProtectedNamesWithData';
import { removeNameFromList } from '../nameListShapeShifter';

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveProtectedName':
        if (
          _.has(action, 'result.data.removeClientFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.clientId, 'clients'
          );
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const Clients = graphql(GetClients, {
  options: ({ id }) => ({ variables: { id }, reducer }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.clients,
    ...ownProps
  })
})(StandardProtectedNamesWithData);

const mapStateToProps = state => ({
  id: state.account.id,
});

export default connect(mapStateToProps)(Clients);
