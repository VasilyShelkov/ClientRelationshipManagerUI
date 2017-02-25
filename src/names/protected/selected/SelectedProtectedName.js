import React from 'react';
import moment from 'moment';

import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import { ClientsIcon } from '../../../app/icons';

import NameDetailsDrawerWithData from '../../NameDetails';
import NameDialogForm from '../../NameDialog';

export default ({
  names, selectedNamePosition, selectedNameDrawerOpen,
  makeNameClientDialogOpen, openClientNameDialog, closeClientNameDialog,
  removeProtectedName, hideProtectedName, onSubmitMakeClient
}) => {
  if (selectedNameDrawerOpen && selectedNamePosition < names.length) {
    const nameToShow = names[selectedNamePosition];
    const displayName = `${nameToShow.name.firstName} ${nameToShow.name.lastName}`;
    return (
      <NameDetailsDrawerWithData
        details={nameToShow}
        closeNameDetails={hideProtectedName}
        removeNameAction={removeProtectedName}
        isProtected
      >
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
              callDay: nameToShow.callBooked ? moment(nameToShow.callBooked).toDate() : {},
              callTime: nameToShow.callBooked ? moment(nameToShow.callBooked).toDate() : {},
              meetingDay: nameToShow.meetingBooked ? moment(nameToShow.meetingBooked).toDate() : {},
              meetingTime: nameToShow.meetingBooked ? moment(nameToShow.meetingBooked).toDate() : {}
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
      </NameDetailsDrawerWithData>
    );
  }

  return null;
};
