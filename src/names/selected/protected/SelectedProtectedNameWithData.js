import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { push } from 'react-router-redux';
import { red500 } from 'material-ui/styles/colors';

import UnprotectName from '../UnprotectName.gql';
import RemoveProtectedName from './RemoveProtectedName.gql';
import MakeClient from './MakeClient.gql';
import MetWithProtected from './MetWithProtected.gql';
import GetNameComments from '../comments/GetNameComments.gql';

import { showNotification } from '../../../app/appActions';
import { performingNameAction } from '../../nameActions';
import {
  openClientNameDialog,
  closeClientNameDialog,
  openMetWithProtectedDialog,
  closeMetWithProtectedDialog,
  hideName
} from '../selectedActions';

import SelectedProtectedName from './SelectedProtectedName';

const SelectedProtectedNameWithMutations = compose(
  graphql(RemoveProtectedName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      removeProtectedName: async () => {
        const { selectedProtected } = ownProps;

        try {
          ownProps.performingNameAction(
            `Removing ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`
          );
          await mutate({
            variables: {
              userId: ownProps.id,
              protectedId: selectedProtected.id
            }
          });
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
      onSubmitMakeClient: async ({ callDay, callTime, meetingDay, meetingTime, comment }) => {
        const { selectedProtected } = ownProps;

        let callBooked = null;
        if (callDay) {
          const callDayMoment = moment(callDay).format();
          const callTimeMoment = moment(callTime).format();
          callBooked = `${callDayMoment.substr(0, callDayMoment.indexOf('T'))}T${callTimeMoment.substr(callTimeMoment.indexOf('T') + 1)}`;
        }

        let meetingBooked = null;
        if (meetingDay) {
          const meetingDayMoment = moment(meetingDay).format();
          const meetingTimeMoment = moment(meetingTime).format();
          meetingBooked = `${meetingDayMoment.substr(0, meetingDayMoment.indexOf('T'))}T${meetingTimeMoment.substr(meetingTimeMoment.indexOf('T') + 1)}`;
        }

        try {
          ownProps.performingNameAction(
            `Making ${selectedProtected.name.firstName} ${selectedProtected.name.lastName} a Client!`
          );
          await mutate({
            variables: {
              userId: ownProps.id,
              nameId: selectedProtected.name.id,
              callBooked,
              meetingBooked,
              comment
            },
            updateQueries: {
              GetClients: (previousResult, { mutationResult }) => ({
                user: {
                  ...previousResult.user,
                  client: [mutationResult.data.addClientToUser, ...previousResult.user.client]
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
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.id,
            id: props.selectedProtected && props.selectedProtected.name.id
          }
        }
      ]
    })
  }),
  graphql(MetWithProtected, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitMeetProtected: async ({ pastMeetingDay, pastMeetingTime, comment }) => {
        const { selectedProtected } = ownProps;

        let metWith = null;
        if (pastMeetingDay) {
          const pastMeetingDayMoment = moment(pastMeetingDay).format();
          const pastMeetingTimeMoment = moment(pastMeetingTime).format();
          metWith = `${pastMeetingDayMoment.substr(0, pastMeetingDayMoment.indexOf('T'))}T${pastMeetingTimeMoment.substr(pastMeetingTimeMoment.indexOf('T') + 1)}`;
        }

        try {
          ownProps.performingNameAction(
            `Changing ${selectedProtected.name.firstName} ${selectedProtected.name.lastName} to Met With Protected`
          );
          await mutate({
            variables: {
              userId: ownProps.id,
              protectedId: selectedProtected.id,
              metWith,
              meetingBooked: null,
              comment
            }
          });
        } catch (error) {
          ownProps.showErrorNotification(
            error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
          );
        }
      }
    }),
    options: props => ({
      refetchQueries: [
        {
          query: GetNameComments,
          variables: {
            userId: props.id,
            id: props.selectedProtected && props.selectedProtected.name.id
          }
        }
      ]
    })
  }),
  graphql(UnprotectName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitUnprotectName: async () => {
        const { selectedProtected } = ownProps;

        try {
          ownProps.performingNameAction(
            `Unprotecting ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`
          );
          await mutate({
            variables: {
              userId: ownProps.id,
              nameId: selectedProtected.name.id
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
          ownProps.unprotectNameSuccess();
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
  makeNameClientDialogOpen: state.selectedName.makeNameClientDialogOpen,
  metWithProtectedDialogOpen: state.selectedName.metWithProtectedDialogOpen
});

const mapDispatchToProps = dispatch => ({
  hideName: () => dispatch(hideName()),
  openMetWithProtectedDialog: () => dispatch(openMetWithProtectedDialog()),
  closeMetWithProtectedDialog: () => dispatch(closeMetWithProtectedDialog()),
  openClientNameDialog: () => dispatch(openClientNameDialog()),
  closeClientNameDialog: () => dispatch(closeClientNameDialog()),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
  makeNameClientSuccess: () => dispatch(push('/account/names/clients')),
  unprotectNameSuccess: () => dispatch(push('/account/names/unprotected'))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProtectedNameWithMutations);
