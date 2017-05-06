import moment from 'moment';

export const onSubmitBookMeeting = ({
  mutate,
  userId,
  names,
  editMeetingDialogOpen,
  nameListTypeIdKey,
  performingNameAction,
  showErrorNotification
}) => async ({ meetingDay, meetingTime }) => {
  const selectedProtected = names.find(name => name.name.id === editMeetingDialogOpen);

  let meetingBooked = null;
  if (meetingDay) {
    meetingBooked = `${moment(meetingDay).format('YYYY-MM-DD')}T${moment(meetingTime).format('HH:mm:ss.sss')}Z`;
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
    showErrorNotification(error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...');
  }
};

export const onSubmitBookCall = ({
  mutate,
  userId,
  names,
  editCallDialogOpen,
  nameListTypeIdKey,
  performingNameAction,
  showErrorNotification
}) => async ({ callDay, callTime }) => {
  const selectedProtected = names.find(name => name.name.id === editCallDialogOpen);

  let callBooked = null;
  if (callDay) {
    callBooked = `${moment(callDay).format('YYYY-MM-DD')}T${moment(callTime).format('HH:mm:ss.sss')}Z`;
  }

  try {
    performingNameAction(`Booking call for ${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`);
    await mutate({
      variables: {
        userId,
        [nameListTypeIdKey]: selectedProtected.id,
        callBooked
      }
    });
  } catch (error) {
    showErrorNotification(error.graphQLErrors ? error.graphQLErrors[0].message : 'Oops, something went wrong...');
  }
};
