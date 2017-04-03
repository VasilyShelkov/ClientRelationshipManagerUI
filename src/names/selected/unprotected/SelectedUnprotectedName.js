import React from 'react';

import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

import SelectedName from '../SelectedName';
import NameDialogForm from '../../NameDialog';

export default ({
  selectedUnprotected, selectedNameDrawerOpen,
  protectNameDialogOpen, openProtectNameDialog, closeProtectNameDialog,
  onSubmitProtectName, removeUnprotectedName, hideName
}) => {
  if (selectedNameDrawerOpen && selectedUnprotected) {
    const displayName = `${selectedUnprotected.name.firstName} ${selectedUnprotected.name.lastName}`;
    return (
      <SelectedName
        details={selectedUnprotected}
        closeNameDetails={hideName}
        removeNameAction={removeUnprotectedName}
      >
        <IconButton
          id="protectName"
          tooltip="Protect Name"
          onClick={openProtectNameDialog}
          touch
        >
          <LockClosedIcon color={cyan500} />
        </IconButton>
        {
          protectNameDialogOpen &&
          <NameDialogForm
            title={`Protect ${displayName}`}
            displayName={displayName}
            open={protectNameDialogOpen}
            close={closeProtectNameDialog}
            onSubmit={onSubmitProtectName}
            initialValues={{
              callDay: null,
              callTime: null,
              meetingDay: null,
              meetingTime: null
            }}
            actions={[
              <FlatButton
                onClick={closeProtectNameDialog}
                label="Cancel"
                secondary
                icon={<CancelIcon />}
              />,
              <FlatButton
                id="submitProtectName"
                form="protectNameForm"
                type="submit"
                label="Protect"
                primary
                icon={<LockClosedIcon />}
              />
            ]}
          />
        }
      </SelectedName>
    );
  }

  return null;
};
