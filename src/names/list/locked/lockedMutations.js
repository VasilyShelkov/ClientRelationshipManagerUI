import moment from 'moment';

export const onSubmitBookMeeting = ({
  mutate, userId, names, editMeetingDialogOpen, nameListTypeIdKey,
  performingNameAction, showErrorNotification
}) => async ({ meetingDay, meetingTime }) => {
  const selectedProtected = names.find(name => name.name.id === editMeetingDialogOpen);

  let meetingBooked = null;
  if (meetingDay) {
    const meetingDayMoment = moment(meetingDay).format();
    const meetingTimeMoment = moment(meetingTime).format();
    meetingBooked = `${meetingDayMoment.substr(0, meetingDayMoment.indexOf('T'))}T${meetingTimeMoment.substr(meetingTimeMoment.indexOf('T') + 1)}`;
  }

  try {
    performingNameAction(`Booking meeting for ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`);
    await mutate({
      variables: {
        userId,
        [nameListTypeIdKey]: selectedProtected.id,
        meetingBooked
      }
    });
  } catch (error) {
    showErrorNotification(
      error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
    );
  }
};

export const onSubmitBookCall = ({
  mutate, userId, names, editCallDialogOpen, nameListTypeIdKey,
  performingNameAction, showErrorNotification
}) => async ({ callDay, callTime }) => {
  const selectedProtected = names.find(name => name.name.id === editCallDialogOpen);

  let callBooked = null;
  if (callDay) {
    const callDayMoment = moment(callDay).format();
    const callTimeMoment = moment(callTime).format();
    callBooked = `${callDayMoment.substr(0, callDayMoment.indexOf('T'))}T${callTimeMoment.substr(callTimeMoment.indexOf('T') + 1)}`;
  }

  try {
    performingNameAction(`Booking call for ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`);
    await mutate({
      variables: {
        userId,
        [nameListTypeIdKey]: selectedProtected.id,
        callBooked,
      }
    });
  } catch (error) {
    showErrorNotification(
      error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...'
    );
  }
};
