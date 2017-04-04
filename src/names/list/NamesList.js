import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { fullWhite, green500 } from 'material-ui/styles/colors';
import ReactList from 'react-list';

import Name from './Name';

export default ({
  id, names, selectedNameId, isProtected, selectedNameDrawerOpen,
  showCreateNameForm = null, openNameDetails,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog,
}) => (
  <div id={id}>
    {
      names.length ?
        <div style={{ overflow: 'auto', maxHeight: 400 }}>
          <ReactList
            length={names.length}
            itemRenderer={
              (index, key) => {
                const typedName = names[index];
                return (
                  <Name
                    id={`name-${key}`}
                    key={`name-${index}`}
                    selected={typedName.name.id === selectedNameId}
                    showMoreDetails={() => openNameDetails(typedName.name.id)}
                    editProtectedCall={() => openEditProtectedNameCallDialog(typedName.name.id)}
                    editProtectedMeeting={() => openEditProtectedNameMeetingDialog(typedName.name.id)}
                    isProtected={isProtected}
                    selectedNameDrawerOpen={selectedNameDrawerOpen}
                    {...typedName}
                  />
                );
              }
            }
          />
        </div>
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
