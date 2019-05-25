import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';
import { loader } from 'graphql.macro';

import { showNotification } from '../../../../app/appActions';
import { performingNameAction } from '../../../nameActions';

import DeleteButton from '../DeleteButton';

const RemoveClient = loader('./RemoveClient.gql');
const GetUserNamesCount = loader('../../../GetUserNamesCount.gql');
const SelectedClientWithMutations = graphql(RemoveClient, {
  props: ({ ownProps, mutate }) => ({
    ...ownProps,
    removeNameAction: async () => {
      const {
        name,
        userId,
        clientId,
        performingNameAction,
        showErrorNotification,
      } = ownProps;
      try {
        performingNameAction(`Removing ${name.firstName} ${name.lastName}`);
        await mutate({
          variables: {
            userId,
            clientId,
          },
        });
      } catch (error) {
        showErrorNotification(
          error.graphQLErrors
            ? error.graphQLErrors[0].message
            : 'Oops, something went wrong...',
        );
      }
    },
  }),
  options: props => ({
    refetchQueries: [
      {
        query: GetUserNamesCount,
        variables: {
          id: props.userId,
        },
      },
    ],
  }),
})(DeleteButton);

const mapStateToProps = state => ({
  userId: state.profile.id,
  clientId: state.selectedName.nameTypeId,
});

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedClientWithMutations);
