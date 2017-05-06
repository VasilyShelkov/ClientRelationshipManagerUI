import React from 'react';

import IconButton from 'material-ui/IconButton';
import { cyan500 } from 'material-ui/styles/colors';

import { UnprotectedIcon } from '../../../app/icons';
import SelectedName from '../SelectedName';

export default ({ selectedClient, selectedNameDrawerOpen, hideName, removeClient, onSubmitUnprotectName }) => {
  if (selectedNameDrawerOpen && selectedClient) {
    return (
      <SelectedName
        details={selectedClient}
        open={selectedNameDrawerOpen}
        closeNameDetails={hideName}
        removeNameAction={removeClient}
        isProtected
      >
        <IconButton
          id="unprotectName"
          tooltip="Unprotect Name"
          onClick={onSubmitUnprotectName}
          touch
        >
          <UnprotectedIcon color={cyan500} />
        </IconButton>
      </SelectedName>
    );
  }

  return null;
};
