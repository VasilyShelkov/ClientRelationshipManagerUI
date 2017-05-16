import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import { red500 } from 'material-ui/styles/colors';

import RemoveClient from './RemoveClient.gql';
import UnprotectName from '../UnprotectName.gql';
import GetUserNamesCount from '../../../GetUserNamesCount.gql';

import { showNotification } from '../../../../app/appActions';
import { performingNameAction } from '../../../nameActions';
import { selectName } from '../../selectedActions';

import SelectedClientActions from './SelectedClientActions';

const SelectedClientActionsWithMutations = graphql(UnprotectName, {
  props: ({ ownProps, mutate }) => ({
    ...ownProps,
    onSubmitUnprotectName: async () => {
      const { userId, name, performingNameAction, unprotectNameSuccess, showErrorNotification } = ownProps;

      try {
        performingNameAction(`Unprotecting ${name.firstName} ${name.lastName}`);
        const unprotectedName = await mutate({
          variables: {
            userId,
            nameId: name.id
          },
          updateQueries: {
            GetUnprotectedNames: (previousResult, { mutationResult }) => ({
              user: {
                ...previousResult.user,
                unprotected: [mutationResult.data.unprotectNameFromUser, ...previousResult.user.unprotected]
              }
            })
          }
        });
        unprotectNameSuccess(_.get(unprotectedName, 'data.unprotectNameFromUser'));
      } catch (error) {
        showErrorNotification(error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...');
      }
    }
  }),
  options: props => ({
    refetchQueries: [
      {
        query: GetUserNamesCount,
        variables: {
          id: props.userId
        }
      }
    ]
  })
})(SelectedClientActions);

const mapStateToProps = state => ({ userId: state.profile.id });

const mapDispatchToProps = dispatch => ({
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
  unprotectNameSuccess: name => dispatch(selectName(name, 'unprotected'))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedClientActionsWithMutations);
