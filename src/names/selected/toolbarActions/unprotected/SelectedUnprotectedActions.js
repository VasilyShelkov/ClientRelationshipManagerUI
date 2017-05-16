import React from 'react';
import { ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { ProtectedIcon } from '../../../../app/icons';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

import NameDialogForm from '../../../NameDialog';

export default ({
  name: { firstName, lastName },
  protectNameDialogOpen,
  openProtectNameDialog,
  closeProtectNameDialog,
  onSubmitProtectName
}) => {
  const displayName = `${firstName} ${lastName}`;
  return (
    <ToolbarGroup>
      <IconButton id="protectName" tooltip="Protect Name" onClick={openProtectNameDialog} touch>
        <ProtectedIcon color={cyan500} />
      </IconButton>

      {protectNameDialogOpen &&
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
            <FlatButton onClick={closeProtectNameDialog} label="Cancel" secondary icon={<CancelIcon />} />,
            <FlatButton
              id="submitProtectName"
              form="protectNameForm"
              type="submit"
              label="Protect"
              primary
              icon={<ProtectedIcon />}
            />
          ]}
        />}
    </ToolbarGroup>
  );
};
