import React from 'react';
import moment from 'moment';
import { ToolbarGroup } from 'material-ui/Toolbar';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

import { UnprotectedIcon, MetWithProtectedIcon, ClientsIcon } from '../../../../app/icons';
import SelectedName from '../../SelectedName';
import NameDialogForm from '../../../NameDialog';

export default ({
  name: { firstName, lastName },
  nameTypeDetails: { callBooked, meetingBooked, metWith },
  makeNameClientDialogOpen,
  metWithProtectedDialogOpen,
  openMetWithProtectedDialog,
  closeMetWithProtectedDialog,
  openClientNameDialog,
  closeClientNameDialog,
  onSubmitUnprotectName,
  onSubmitMakeClient,
  onSubmitMeetProtected
}) => {
  const displayName = `${name.firstName} ${name.lastName}`;
  const callBookedDate = moment(callBooked).toDate();
  const meetingBookedDate = moment(meetingBooked).toDate();

  return (
    <ToolbarGroup>
      <IconButton id="unprotectName" tooltip="Unprotect Name" onClick={onSubmitUnprotectName} touch>
        <UnprotectedIcon color={cyan500} />
      </IconButton>
      {!metWith &&
        <IconButton id="metWithProtected" tooltip="Met With Protected" onClick={openMetWithProtectedDialog} touch>
          <MetWithProtectedIcon color={cyan500} />
        </IconButton>}
      <IconButton id="makeClient" tooltip="Make Name Client" onClick={openClientNameDialog} touch>
        <ClientsIcon color={cyan500} />
      </IconButton>
      {makeNameClientDialogOpen &&
        <NameDialogForm
          title={`Make ${displayName} a Client`}
          displayName={displayName}
          open={makeNameClientDialogOpen}
          close={closeClientNameDialog}
          onSubmit={onSubmitMakeClient}
          initialValues={{
            callDay: callBooked ? callBookedDate : null,
            callTime: callBooked ? callBookedDate : null,
            meetingDay: meetingBooked ? meetingBookedDate : null,
            meetingTime: meetingBooked ? meetingBookedDate : null
          }}
          actions={[
            <FlatButton secondary onClick={closeClientNameDialog} label="Cancel" icon={<CancelIcon />} />,
            <FlatButton
              primary
              id="submitClientName"
              form="protectNameForm"
              type="submit"
              label="Make Client"
              icon={<ClientsIcon />}
            />
          ]}
        />}
      {!metWith &&
        metWithProtectedDialogOpen &&
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
            <FlatButton secondary onClick={closeMetWithProtectedDialog} label="Cancel" icon={<CancelIcon />} />,
            <FlatButton
              primary
              id="submitMetWithName"
              form="protectNameForm"
              type="submit"
              label="Confirm Meeting"
              icon={<MetWithProtectedIcon />}
            />
          ]}
        />}
    </ToolbarGroup>
  );
};
