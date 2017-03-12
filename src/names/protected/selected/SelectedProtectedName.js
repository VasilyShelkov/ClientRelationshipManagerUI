import React from 'react';
import moment from 'moment';

import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import { UnprotectedIcon, MetWithProtectedIcon, ClientsIcon } from '../../../app/icons';

import NameDetailsDrawerWithData from '../../NameDetails';
import NameDialogForm from '../../NameDialog';

export default ({
  selectedProtected, selectedNameDrawerOpen,
  makeNameClientDialogOpen, metWithProtectedDialogOpen,
  openMetWithProtectedDialog, closeMetWithProtectedDialog,
  openClientNameDialog, closeClientNameDialog,
  removeProtectedName, hideName, onSubmitUnprotectName,
  onSubmitMakeClient, onSubmitMeetProtected
}) => {
  if (selectedNameDrawerOpen && selectedProtected) {
    const displayName = `${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`;
    const { callBooked, meetingBooked } = selectedProtected;
    const callBookedDate = moment(callBooked).toDate();
    const meetingBookedDate = moment(meetingBooked).toDate();

    return (
      <NameDetailsDrawerWithData
        details={selectedProtected}
        open={selectedNameDrawerOpen}
        closeNameDetails={hideName}
        removeNameAction={removeProtectedName}
        isProtected
      >
        <IconButton
          tooltip="Unprotect Name"
          onClick={onSubmitUnprotectName}
          touch
        >
          <UnprotectedIcon color={cyan500} />
        </IconButton>
        {
          !selectedProtected.metWith &&
          <IconButton
            tooltip="Met With Protected"
            onClick={openMetWithProtectedDialog}
            touch
          >
            <MetWithProtectedIcon color={cyan500} />
          </IconButton>
        }
        <IconButton
          tooltip="Make Name Client"
          onClick={openClientNameDialog}
          touch
        >
          <ClientsIcon color={cyan500} />
        </IconButton>
        {
          makeNameClientDialogOpen &&
          <NameDialogForm
            title={`Make ${displayName} a Client`}
            displayName={displayName}
            open={makeNameClientDialogOpen}
            close={closeClientNameDialog}
            onSubmit={onSubmitMakeClient}
            initialValues={{
              callDay: callBooked ? callBookedDate : {},
              callTime: callBooked ? callBookedDate : {},
              meetingDay: meetingBooked ? meetingBookedDate : {},
              meetingTime: meetingBooked ? meetingBookedDate : {}
            }}
            actions={[
              <FlatButton
                secondary
                onClick={closeClientNameDialog}
                label="Cancel"
                icon={<CancelIcon />}
              />,
              <FlatButton
                primary
                form="protectName"
                type="submit"
                label="Make Client"
                icon={<ClientsIcon />}
              />
            ]}
          />
        }
        {
          !selectedProtected.metWith && metWithProtectedDialogOpen &&
          <NameDialogForm
            title={`I've met with ${displayName}...`}
            displayName={displayName}
            open={metWithProtectedDialogOpen}
            close={closeMetWithProtectedDialog}
            onSubmit={onSubmitMeetProtected}
            initialValues={{
              pastMeetingDay: meetingBooked ? meetingBookedDate : moment().toDate(),
              pastMeetingTime: meetingBooked ? meetingBookedDate : moment().toDate()
            }}
            actions={[
              <FlatButton
                secondary
                onClick={closeMetWithProtectedDialog}
                label="Cancel"
                icon={<CancelIcon />}
              />,
              <FlatButton
                primary
                form="protectName"
                type="submit"
                label="Confirm Meeting"
                icon={<MetWithProtectedIcon />}
              />
            ]}
          />
        }
      </NameDetailsDrawerWithData>
    );
  }

  return null;
};
