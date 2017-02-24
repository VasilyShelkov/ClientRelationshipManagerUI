import React from 'react';

import ClientsIcon from 'material-ui/svg-icons/social/group';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

import NameDetailsDrawerWithData from '../../NameDetails';
import NameDialogForm from '../../NameDialog';

export default ({
  names, selectedNamePosition, selectedNameDrawerOpen,
  protectNameDialogOpen, openProtectNameDialog, closeProtectNameDialog,
  removeProtectedName, hideProtectedName
}) => {
  if (selectedNameDrawerOpen && selectedNamePosition < names.length) {
    const nameToShow = names[selectedNamePosition];
    return (
      <NameDetailsDrawerWithData
        details={nameToShow}
        closeNameDetails={hideProtectedName}
        removeNameAction={removeProtectedName}
      >
        <IconButton
          tooltip="Make Name Client"
          onClick={openProtectNameDialog}
          touch
        >
          <ClientsIcon color={cyan500} />
        </IconButton>
        <NameDialogForm
          displayName={`${nameToShow.name.firstName} ${nameToShow.name.lastName}`}
          open={protectNameDialogOpen}
          close={closeProtectNameDialog}
          handleSubmit={() => ({})}
          actions={[
            <FlatButton
              onClick={closeProtectNameDialog}
              label="Cancel"
              secondary
              icon={<CancelIcon />}
            />,
            <FlatButton
              onClick={() => ({})}
              type="submit"
              label="Protect"
              primary
              icon={<ClientsIcon />}
            />
          ]}
        />
      </NameDetailsDrawerWithData>
    );
  }

  return null;
};
