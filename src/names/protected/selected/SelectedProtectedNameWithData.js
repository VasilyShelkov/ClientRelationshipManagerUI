import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { push } from 'react-router-redux';
import { red500 } from 'material-ui/styles/colors';

import RemoveProtectedName from './RemoveProtectedName.gql';
import MakeClient from './MakeClient.gql';
import MetWithProtected from './MetWithProtected.gql';

import { showNotification } from '../../../app/appActions';
import {
  openClientNameDialog, closeClientNameDialog,
  openMetWithProtectedDialog, closeMetWithProtectedDialog,
  hideName, performingNameAction
} from '../../nameActions';

import SelectedProtectedName from './SelectedProtectedName';

const SelectedProtectedNameWithMutations = compose(
  graphql(RemoveProtectedName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      removeProtectedName: async () => {
        const { selectedProtected } = ownProps;

        try {
          ownProps.performingNameAction(`Removing ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`);
          await mutate({ variables: {
            userId: ownProps.id,
            protectedId: selectedProtected.id
          } });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  }),
  graphql(MakeClient, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitMakeClient: async ({ callDay, callTime, meetingDay, meetingTime }) => {
        const { selectedProtected } = ownProps;

        let callBooked = null;
        if (callDay) {
          callBooked = `${moment(callDay).format('YYYY-MM-DD')}T${moment(callTime).format('HH:mm:ss.sss')}Z`;
        }

        let meetingBooked = null;
        if (meetingDay) {
          meetingBooked = `${moment(meetingDay).format('YYYY-MM-DD')}T${moment(meetingTime).format('HH:mm:ss.sss')}Z`;
        }

        try {
          ownProps.performingNameAction(`Making ${selectedProtected.name.firstName} ${selectedProtected.name.lastName} a Client!`);
          await mutate({
            variables: {
              userId: ownProps.id,
              nameId: selectedProtected.name.id,
              callBooked,
              meetingBooked
            },
            updateQueries: {
              GetClientNames: (previousResult, { mutationResult }) => ({
                user: {
                  ...previousResult.user,
                  client: [
                    mutationResult.data.addClientToUser,
                    ...previousResult.user.client
                  ]
                }
              })
            }
          });
          ownProps.makeNameClientSuccess();
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  }),
  graphql(MetWithProtected, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitMeetProtected: async ({ pastMeetingDay, pastMeetingTime }) => {
        const { selectedProtected } = ownProps;

        let metWith = null;
        if (pastMeetingDay) {
          metWith = `${moment(pastMeetingDay).format('YYYY-MM-DD')}T${moment(pastMeetingTime).format('HH:mm:ss.sss')}Z`;
        }

        try {
          ownProps.performingNameAction(`Changing ${selectedProtected.name.firstName} ${selectedProtected.name.lastName} to Met With Protected`);
          await mutate({
            variables: {
              userId: ownProps.id,
              protectedId: selectedProtected.id,
              metWith,
              meetingBooked: null
            }
          });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    })
  })
)(SelectedProtectedName);

const mapStateToProps = state => ({
  id: state.account.id,
  makeNameClientDialogOpen: state.name.makeNameClientDialogOpen,
  metWithProtectedDialogOpen: state.name.metWithProtectedDialogOpen,
});

const mapDispatchToProps = (dispatch) => ({
  hideName: () => dispatch(hideName()),
  openMetWithProtectedDialog: () => dispatch(openMetWithProtectedDialog()),
  closeMetWithProtectedDialog: () => dispatch(closeMetWithProtectedDialog()),
  openClientNameDialog: () => dispatch(openClientNameDialog()),
  closeClientNameDialog: () => dispatch(closeClientNameDialog()),
  performingNameAction: (message) => dispatch(performingNameAction(message)),
  showErrorNotification: (message) => dispatch(showNotification(message, red500)),
  makeNameClientSuccess: () => dispatch(push('/account/names/clients'))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectedProtectedNameWithMutations);
