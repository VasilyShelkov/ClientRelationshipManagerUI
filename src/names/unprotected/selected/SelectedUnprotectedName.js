import React from 'react';

import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

import NameDetailsDrawerWithData from '../../NameDetails';
import NameDialogForm from '../../NameDialog';

export default ({
  names, nameDetailsToShow, nameDetailsDrawerOpen,
  protectNameDialogOpen, openProtectNameDialog, closeProtectNameDialog,
  onSubmitProtectName, removeUnprotectedName
}) => {
  if (nameDetailsDrawerOpen && nameDetailsToShow < names.length) {
    const nameToShow = names[nameDetailsToShow];
    return (
      <NameDetailsDrawerWithData
        details={nameToShow}
        removeNameAction={
          () => removeUnprotectedName(nameToShow)
        }
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
          handleSubmit={onSubmitProtectName(
            nameToShow.id,
            nameToShow.name.id
          )}
          actions={[
            <FlatButton
              onClick={closeProtectNameDialog}
              label="Cancel"
              secondary
              icon={<CancelIcon />}
            />,
            <FlatButton
              onClick={onSubmitProtectName(
                nameToShow.id,
                nameToShow.name.id
              )}
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
