import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../../../app/thirdPartyActions';
import GetClients from './GetClients.gql';
import ClientsWithEditMutations from './ClientsWithEditMutations';
import { removeNameFromList, getNameByNameId } from '../../nameListShapeShifter';

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveClient':
        if (_.has(action, 'result.data.removeClientFromUser') && !_.has(action, 'result.errors')) {
          return removeNameFromList(previousResult, action.variables.clientId, 'client');
        }
        break;
      case 'UnprotectName':
        if (_.has(action, 'result.data.unprotectNameFromUser') && !_.has(action, 'result.errors')) {
          return removeNameFromList(previousResult, action.variables.nameId, 'client', true);
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
  props: ({ ownProps, data: { loading, user } }) => {
    const selectedName = user && getNameByNameId(user.client, ownProps.selectedNameId);
    return {
      loading,
      names: user && user.client,
      selectedName,
      selectedNameDrawerOpen: Boolean(selectedName),
      ...ownProps
    };
  }
})(ClientsWithEditMutations);

const mapStateToProps = state => ({
  id: state.account.id,
  selectedNameId: state.name.selectedName
});

export default connect(mapStateToProps)(Clients);
