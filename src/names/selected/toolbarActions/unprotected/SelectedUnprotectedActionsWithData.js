import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { red500 } from 'material-ui/styles/colors';
import { loader } from 'graphql.macro';

import { showNotification } from '../../../../app/appActions';
import {
  openProtectNameDialog,
  closeProtectNameDialog,
} from '../../selectedActions';
import { performingNameAction } from '../../../nameActions';

import SelectedUnprotectedActions from './SelectedUnprotectedActions';

const ProtectName = loader('./ProtectName.gql');
const GetNameComments = loader('../../comments/GetNameComments.gql');
const GetUserNamesCount = loader('../../../GetUserNamesCount.gql');

const SelectedUnprotectedActionsWithMutations = compose(
  graphql(ProtectName, {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      onSubmitProtectName: async ({
        callDay,
        callTime,
        meetingDay,
        meetingTime,
        comment,
      }) => {
        const {
          userId,
          unprotectedId,
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
          performingNameAction(`Protecting ${name.firstName} ${name.lastName}`);
          await mutate({
            variables: {
              unprotectedId,
              nameId: name.id,
              userId,
              callBooked,
              meetingBooked,
              comment,
            },
            updateQueries: {
              GetProtectedNames: (previousResult, { mutationResult }) => ({
                user: {
                  ...previousResult.user,
                  protected: [
                    mutationResult.data.protectNameToUser,
                    ...previousResult.user.protected,
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
)(SelectedUnprotectedActions);

const mapStateToProps = state => ({
  userId: state.profile.id,
  unprotectedId: state.selectedName.nameTypeId,
  protectNameDialogOpen: state.selectedName.protectNameDialogOpen,
});

const mapDispatchToProps = dispatch => ({
  openProtectNameDialog: () => dispatch(openProtectNameDialog()),
  closeProtectNameDialog: () => dispatch(closeProtectNameDialog()),
  performingNameAction: message => dispatch(performingNameAction(message)),
  showErrorNotification: message => dispatch(showNotification(message, red500)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedUnprotectedActionsWithMutations);
