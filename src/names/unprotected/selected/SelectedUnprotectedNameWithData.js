import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { red500 } from 'material-ui/styles/colors';

import RemoveUnprotectedName from './RemoveUnprotectedName.gql';
import ProtectName from './ProtectName.gql';

import { showNotification } from '../../../app/appActions';
import {
  hideUnprotectedName, openProtectNameDialog, closeProtectNameDialog,
  performingNameAction
} from '../../nameActions';

import SelectedUnprotectedName from './SelectedUnprotectedName';

const SelectedUnprotectedNameWithMutations = compose(
  graphql(RemoveUnprotectedName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      removeUnprotectedName: async () => {
        const { names, selectedNamePosition } = ownProps;
        const selectedUnprotected = names[selectedNamePosition];

        try {
          ownProps.performingNameAction(`Removing ${selectedUnprotected.name.firstName} ${selectedUnprotected.name.lastName}`);
          await mutate({ variables: {
            userId: ownProps.id,
            unprotectedId: selectedUnprotected.id
          } });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  }),
  graphql(ProtectName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitProtectName: async ({ callDay, callTime, meetingDay, meetingTime }) => {
        const { names, selectedNamePosition } = ownProps;
        const selectedUnprotected = names[selectedNamePosition];

        let callBooked = null;
        if (callDay) {
          callBooked = callDay.substring(0, callDay.indexOf('T')) + callTime.substring(callTime.indexOf('T'));
        }

        let meetingBooked = null;
        if (meetingDay) {
          meetingBooked = meetingDay.substring(0, meetingDay.indexOf('T')) + meetingTime.substring(meetingTime.indexOf('T'));
        }

        try {
          ownProps.performingNameAction(`Protecting ${selectedUnprotected.name.firstName} ${selectedUnprotected.name.lastName}`);
          await mutate({
            variables: {
              userId: ownProps.id,
              unprotectedId: selectedUnprotected.id,
              nameId: selectedUnprotected.name.id,
              callBooked,
              meetingBooked
            },
            updateQueries: {
              GetProtectedNames: (previousResult, { mutationResult }) => ({
                user: {
                  ...previousResult.user,
                  protected: [
                    mutationResult.data.protectNameToUser,
                    ...previousResult.user.protected
                  ]
                }
              })
            }
          });
          ownProps.protectNameSuccess();
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  })
)(SelectedUnprotectedName);

const mapStateToProps = state => ({
  id: state.account.id,
  protectNameDialogOpen: state.name.protectNameDialogOpen,
  showingCreateForm: state.name.showingCreateForm
});

const mapDispatchToProps = (dispatch) => ({
  hideUnprotectedName: () => dispatch(hideUnprotectedName()),
  openProtectNameDialog: () => dispatch(openProtectNameDialog()),
  closeProtectNameDialog: () => dispatch(closeProtectNameDialog()),
  performingNameAction: (message) => dispatch(performingNameAction(message)),
  protectNameSuccess: () => dispatch(push('/account/names/protected')),
  showErrorNotification: (message) => dispatch(showNotification(message, red500))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedUnprotectedNameWithMutations);
