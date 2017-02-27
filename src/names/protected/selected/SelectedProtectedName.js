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
  selectedProtected, selectedNameDrawerOpen,
  makeNameClientDialogOpen, openClientNameDialog, closeClientNameDialog,
  removeProtectedName, hideName, onSubmitMakeClient
}) => {
  if (selectedNameDrawerOpen && selectedProtected) {
    const displayName = `${selectedProtected.name.firstName} ${selectedProtected.name.lastName}`;
    return (
      <NameDetailsDrawerWithData
        details={selectedProtected}
        open={selectedNameDrawerOpen}
        closeNameDetails={hideName}
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
              callDay: selectedProtected.callBooked ? moment(selectedProtected.callBooked).toDate() : {},
              callTime: selectedProtected.callBooked ? moment(selectedProtected.callBooked).toDate() : {},
              meetingDay: selectedProtected.meetingBooked ? moment(selectedProtected.meetingBooked).toDate() : {},
              meetingTime: selectedProtected.meetingBooked ? moment(selectedProtected.meetingBooked).toDate() : {}
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
