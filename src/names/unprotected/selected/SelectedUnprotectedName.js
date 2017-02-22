import React from 'react';

import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

import NameDetailsDrawerWithData from '../../NameDetails';
import NameDialogForm from '../../NameDialog';

export default ({
  names, selectedNamePosition, selectedNameDrawerOpen,
  protectNameDialogOpen, openProtectNameDialog, closeProtectNameDialog,
  onSubmitProtectName, removeUnprotectedName, hideUnprotectedName
}) => {
  if (selectedNameDrawerOpen && selectedNamePosition < names.length) {
    const nameToShow = names[selectedNamePosition];
    return (
      <NameDetailsDrawerWithData
        details={nameToShow}
        closeNameDetails={hideUnprotectedName}
        removeNameAction={removeUnprotectedName}
      >
        <IconButton
          tooltip="Protect Name"
          onClick={openProtectNameDialog}
          touch
        >
          <LockClosedIcon color={cyan500} />
        </IconButton>
        <NameDialogForm
          displayName={`${nameToShow.name.firstName} ${nameToShow.name.lastName}`}
          open={protectNameDialogOpen}
          close={closeProtectNameDialog}
          handleSubmit={onSubmitProtectName}
          actions={[
            <FlatButton
              onClick={closeProtectNameDialog}
              label="Cancel"
              secondary
              icon={<CancelIcon />}
            />,
            <FlatButton
              onClick={onSubmitProtectName}
              type="submit"
              label="Protect"
              primary
              icon={<LockClosedIcon />}
            />
          ]}
        />
      </NameDetailsDrawerWithData>
    );
  }

  return null;
};
