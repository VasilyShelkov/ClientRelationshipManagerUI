import React from 'react';

import NameDetailsDrawerWithData from '../../NameDetails';

export default ({
  selectedClient, selectedNameDrawerOpen, removeClient, hideName
}) => {
  if (selectedNameDrawerOpen && selectedClient) {
    return (
      <NameDetailsDrawerWithData
        details={selectedClient}
        open={selectedNameDrawerOpen}
        closeNameDetails={hideName}
        removeNameAction={removeClient}
        isProtected
      />
    );
  }

  return null;
};
