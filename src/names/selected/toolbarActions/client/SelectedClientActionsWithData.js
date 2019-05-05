import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';
import { loader } from 'graphql.macro';

import { showNotification } from '../../../../app/appActions';
import { performingNameAction } from '../../../nameActions';

import SelectedClientActions from './SelectedClientActions';

const UnprotectName = loader('../UnprotectName.gql');
const GetUserNamesCount = loader('../../../GetUserNamesCount.gql');
const SelectedClientActionsWithMutations = graphql(UnprotectName, {
  props: ({ ownProps, mutate }) => ({
    ...ownProps,
    onSubmitUnprotectName: async () => {
      const {
        userId,
        name,
        performingNameAction,
        showErrorNotification,
      } = ownProps;

      try {
        performingNameAction(`Unprotecting ${name.firstName} ${name.lastName}`);
        await mutate({
          variables: {
            userId,
            nameId: name.id,
          },
          updateQueries: {
            GetUnprotectedNames: (previousResult, { mutationResult }) => ({
              user: {
                ...previousResult.user,
                unprotected: [
                  mutationResult.data.unprotectNameFromUser,
                  ...previousResult.user.unprotected,
                ],
              },
            }),
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
})(SelectedClientActions);

const mapStateToProps = state => ({ userId: state.profile.id });

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedClientActionsWithMutations);
