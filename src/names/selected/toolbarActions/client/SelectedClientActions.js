import React from 'react';
import { ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { cyan500 } from 'material-ui/styles/colors';

import { UnprotectedIcon } from '../../../../app/icons';

export default ({ onSubmitUnprotectName }) => (
  <ToolbarGroup>
    <IconButton id="unprotectName" tooltip="Unprotect Name" onClick={onSubmitUnprotectName} touch>
      <UnprotectedIcon color={cyan500} />
    </IconButton>
  </ToolbarGroup>
);
