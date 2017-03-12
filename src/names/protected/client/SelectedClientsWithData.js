import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { red500 } from 'material-ui/styles/colors';

import RemoveClient from './RemoveClient.gql';
import UnprotectName from '../selected/UnprotectName.gql';
import { showNotification } from '../../../app/appActions';
import { hideName, performingNameAction } from '../../nameActions';

import SelectedClient from './SelectedClient';

const SelectedClientWithMutations = compose(
  graphql(RemoveClient, {
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
  }),
  graphql(UnprotectName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitUnprotectName: async () => {
        const { selectedClient } = ownProps;

        try {
          ownProps.performingNameAction(`Unprotecting ${selectedClient.name.firstName} ${selectedClient.name.lastName}`);
          await mutate({
            variables: {
              userId: ownProps.id,
              nameId: selectedClient.name.id,
            },
            updateQueries: {
              GetUnprotectedNames: (previousResult, { mutationResult }) => ({
                user: {
                  ...previousResult.user,
                  unprotected: [
                    mutationResult.data.unprotectNameFromUser,
                    ...previousResult.user.unprotected
                  ]
                }
              })
            }
          });
          ownProps.unprotectNameSuccess();
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  })
)(SelectedClient);

const mapStateToProps = state => ({
  id: state.account.id,
});

const mapDispatchToProps = dispatch => ({
  hideName: () => dispatch(hideName()),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
  unprotectNameSuccess: () => dispatch(push('/account/names/unprotected'))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedClientWithMutations);
