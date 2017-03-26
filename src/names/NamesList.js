import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { fullWhite, green500 } from 'material-ui/styles/colors';

import Name from './Name';
import EditNameProtectedInfoWithData from './edit/EditNameProtectedInfo';

export default ({
  id, names, selectedNameId, isProtected, selectedNameDrawerOpen,
  showCreateNameForm = null, openNameDetails,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog,
}) => (
  <div id={id}>
    {
      names.length ?
        names.map((name, index) => (
          <Name
            id={`name-${index}`}
            key={`name-${index}`}
            selected={name.name.id === selectedNameId}
            showMoreDetails={() => openNameDetails(name.name.id)}
            editProtectedCall={() => openEditProtectedNameCallDialog(name.name.id)}
            editProtectedMeeting={() => openEditProtectedNameMeetingDialog(name.name.id)}
            isProtected={isProtected}
            selectedNameDrawerOpen={selectedNameDrawerOpen}
            {...name}
          />
        ))
      :
        <div>
          {
            showCreateNameForm ?
              <RaisedButton
                id="createUnprotectedName"
                onClick={showCreateNameForm}
                labelStyle={{ color: fullWhite }}
                backgroundColor={green500}
                label="Create first name"
                icon={<AddIcon color={fullWhite} />}
                fullWidth
              />
            :
              'You currently have none'
          }
        </div>
    }
  </div>
);
