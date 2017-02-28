import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';

import RemoveClient from './RemoveClient.gql';
import { showNotification } from '../../../app/appActions';
import { hideName, performingNameAction } from '../../nameActions';

import SelectedClient from './SelectedClient';

const SelectedClientWithMutations = graphql(RemoveClient, {
  props: ({ ownProps, mutate }) => ({
    ...ownProps,
    removeClient: async () => {
      const { selectedClient } = ownProps;

      try {
        ownProps.performingNameAction(`Removing ${selectedClient.name.firstName} ${selectedClient.name.lastName}`);
        await mutate({ variables: {
          userId: ownProps.id,
          clientId: selectedClient.id
        } });
      } catch (error) {
        ownProps.showErrorNotification(
          error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
        );
      }
    }
  })
})(SelectedClient);

const mapStateToProps = state => ({
  id: state.account.id,
});

const mapDispatchToProps = dispatch => ({
  hideName: () => dispatch(hideName()),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedClientWithMutations);
