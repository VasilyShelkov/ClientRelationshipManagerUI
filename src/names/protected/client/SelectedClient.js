import React from 'react';

import IconButton from 'material-ui/IconButton';
import { cyan500 } from 'material-ui/styles/colors';

import { UnprotectedIcon } from '../../../app/icons';
import NameDetailsDrawerWithData from '../../NameDetails';

export default ({ selectedClient, selectedNameDrawerOpen, hideName, removeClient, onSubmitUnprotectName }) => {
  if (selectedNameDrawerOpen && selectedClient) {
    return (
      <NameDetailsDrawerWithData
        details={selectedClient}
        open={selectedNameDrawerOpen}
        closeNameDetails={hideName}
        removeNameAction={removeClient}
        isProtected
      >
        <IconButton tooltip="Unprotect Name" onClick={onSubmitUnprotectName} touch>
          <UnprotectedIcon color={cyan500} />
        </IconButton>
      </NameDetailsDrawerWithData>
    );
  }

  return null;
};
