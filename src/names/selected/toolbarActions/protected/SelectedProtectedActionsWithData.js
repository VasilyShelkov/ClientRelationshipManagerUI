import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { red500 } from 'material-ui/styles/colors';
import { loader } from 'graphql.macro';

import { showNotification } from '../../../../app/appActions';
import { performingNameAction } from '../../../nameActions';
import {
  openClientNameDialog,
  closeClientNameDialog,
  openMetWithProtectedDialog,
  closeMetWithProtectedDialog,
} from '../../selectedActions';

import SelectedProtectedActions from './SelectedProtectedActions';

const UnprotectName = loader('../UnprotectName.gql');
const MakeClient = loader('./MakeClient.gql');
const MetWithProtected = loader('./MetWithProtected.gql');
const GetNameComments = loader('../../comments/GetNameComments.gql');
const GetUserNamesCount = loader('../../../GetUserNamesCount.gql');

const SelectedProtectedActionsWithMutations = compose(
  graphql(MakeClient, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitMakeClient: async ({
        callDay,
        callTime,
        meetingDay,
        meetingTime,
        comment,
      }) => {
        const {
          userId,
          name,
          performingNameAction,
          showErrorNotification,
        } = ownProps;

        let callBooked = null;
        if (callDay) {
          const callDayMoment = moment(callDay).format();
          const callTimeMoment = moment(callTime).format();
          callBooked = `${callDayMoment.substr(
            0,
            callDayMoment.indexOf('T'),
          )}T${callTimeMoment.substr(callTimeMoment.indexOf('T') + 1)}`;
        }

        let meetingBooked = null;
        if (meetingDay) {
          const meetingDayMoment = moment(meetingDay).format();
          const meetingTimeMoment = moment(meetingTime).format();
          meetingBooked = `${meetingDayMoment.substr(
            0,
            meetingDayMoment.indexOf('T'),
          )}T${meetingTimeMoment.substr(meetingTimeMoment.indexOf('T') + 1)}`;
        }

        try {
          performingNameAction(
            `Making ${name.firstName} ${name.lastName} a Client!`,
          );
          const client = await mutate({
            variables: {
              userId,
              nameId: name.id,
              callBooked,
              meetingBooked,
              comment,
            },
            updateQueries: {
              GetClients: (previousResult, { mutationResult }) => ({
                user: {
                  ...previousResult.user,
                  client: [
                    mutationResult.data.addClientToUser,
                    ...previousResult.user.client,
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
          query: GetNameComments,
          variables: {
            userId: props.userId,
            id: props.name.id,
          },
        },
        {
          query: GetUserNamesCount,
          variables: {
            id: props.userId,
          },
        },
      ],
    }),
  }),
  graphql(MetWithProtected, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitMeetProtected: async ({
        pastMeetingDay,
        pastMeetingTime,
        comment,
      }) => {
        const {
          userId,
          protectedId,
          name,
          performingNameAction,
          showErrorNotification,
        } = ownProps;

        let metWith = null;
        if (pastMeetingDay) {
          const pastMeetingDayMoment = moment(pastMeetingDay).format();
          const pastMeetingTimeMoment = moment(pastMeetingTime).format();
          metWith = `${pastMeetingDayMoment.substr(
            0,
            pastMeetingDayMoment.indexOf('T'),
          )}T${pastMeetingTimeMoment.substr(
            pastMeetingTimeMoment.indexOf('T') + 1,
          )}`;
        }

        try {
          performingNameAction(
            `Changing ${name.firstName} ${name.lastName} to Met With Protected`,
          );
          const metWithProtectedName = await mutate({
            variables: {
              userId,
              protectedId,
              metWith,
              meetingBooked: null,
              comment,
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
          query: GetNameComments,
          variables: {
            userId: props.userId,
            id: props.name.id,
          },
        },
        {
          query: GetUserNamesCount,
          variables: {
            id: props.userId,
          },
        },
      ],
    }),
  }),
  graphql(UnprotectName, {
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
          performingNameAction(
            `Unprotecting ${name.firstName} ${name.lastName}`,
          );
          const unprotectedName = await mutate({
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
  }),
)(SelectedProtectedActions);

const mapStateToProps = state => ({
  userId: state.profile.id,
  protectedId: state.selectedName.nameTypeId,
  name: state.apollo.data[state.selectedName.nameId],
  nameTypeDetails: state.apollo.data[state.selectedName.nameTypeId],
  makeNameClientDialogOpen: state.selectedName.makeNameClientDialogOpen,
  metWithProtectedDialogOpen: state.selectedName.metWithProtectedDialogOpen,
});

const mapDispatchToProps = dispatch => ({
  openMetWithProtectedDialog: () => dispatch(openMetWithProtectedDialog()),
  closeMetWithProtectedDialog: () => dispatch(closeMetWithProtectedDialog()),
  openClientNameDialog: () => dispatch(openClientNameDialog()),
  closeClientNameDialog: () => dispatch(closeClientNameDialog()),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedProtectedActionsWithMutations);
