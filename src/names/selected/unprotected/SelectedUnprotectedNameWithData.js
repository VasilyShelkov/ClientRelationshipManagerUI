import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { push } from 'react-router-redux';
import { red500 } from 'material-ui/styles/colors';

import RemoveUnprotectedName from './RemoveUnprotectedName.gql';
import ProtectName from './ProtectName.gql';

import { showNotification } from '../../../app/appActions';
import {
  hideName, openProtectNameDialog, closeProtectNameDialog,
} from '../selectedActions';
import { performingNameAction } from '../../nameActions';

import SelectedUnprotectedName from './SelectedUnprotectedName';

const SelectedUnprotectedNameWithMutations = compose(
  graphql(RemoveUnprotectedName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      removeUnprotectedName: async () => {
        const { selectedUnprotected } = ownProps;

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
        const { selectedUnprotected } = ownProps;

        let callBooked = null;
        if (callDay) {
          callBooked = `${moment(callDay).format('YYYY-MM-DD')}T${moment(callTime).format('HH:mm:ss.sss')}Z`;
        }

        let meetingBooked = null;
        if (meetingDay) {
          meetingBooked = `${moment(meetingDay).format('YYYY-MM-DD')}T${moment(meetingTime).format('HH:mm:ss.sss')}Z`;
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
  protectNameDialogOpen: state.selectedName.protectNameDialogOpen,
  showingCreateForm: state.nameList.showingCreateForm
});

const mapDispatchToProps = dispatch => ({
  hideName: () => dispatch(hideName()),
  openProtectNameDialog: () => dispatch(openProtectNameDialog()),
  closeProtectNameDialog: () => dispatch(closeProtectNameDialog()),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
  protectNameSuccess: () => dispatch(push('/account/names/protected'))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedUnprotectedNameWithMutations);
