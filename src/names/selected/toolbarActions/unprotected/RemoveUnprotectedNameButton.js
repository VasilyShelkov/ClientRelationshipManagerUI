import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';

import RemoveUnprotectedName from './RemoveUnprotectedName.gql';
import GetUserNamesCount from '../../../GetUserNamesCount.gql';

import { showNotification } from '../../../../app/appActions';
import { performingNameAction } from '../../../nameActions';

import DeleteButton from '../DeleteButton';

const RemoveUnprotectedNameButtonWithData = graphql(RemoveUnprotectedName, {
  props: ({ ownProps, mutate }) => ({
    ...ownProps,
    removeNameAction: async () => {
      const { name, userId, unprotectedId } = ownProps;
      try {
        ownProps.performingNameAction(
          `Removing ${name.firstName} ${name.lastName}`,
        );
        await mutate({
          variables: {
            userId,
            unprotectedId,
          },
        });
      } catch (error) {
        ownProps.showErrorNotification(
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
  unprotectedId: state.selectedName.nameTypeId,
});

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RemoveUnprotectedNameButtonWithData,
);
