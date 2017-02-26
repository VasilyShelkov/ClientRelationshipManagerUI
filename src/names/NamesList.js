import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { fullWhite, green500 } from 'material-ui/styles/colors';

import Name from './Name';
import EditNameProtectedInfoWithData from './edit/EditNameProtectedInfo';

export default ({
  names, selectedNamePosition, isProtected,
  showCreateNameForm = null, openNameDetails,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog,
  onSubmitBookCall, onSubmitBookMeeting
}) => (
  <div>
    {
      names.length ?
        names.map((name, index) => (
          <Name
            key={`name-${index}`}
            selected={index === selectedNamePosition}
            showMoreDetails={() => openNameDetails(index)}
            editProtectedMeeting={() => openEditProtectedNameMeetingDialog(name.name.id)}
            editProtectedCall={() => openEditProtectedNameCallDialog(name.name.id)}
            isProtected={isProtected}
            selectedNameDrawerOpen={selectedNamePosition !== false}
            {...name}
          />
        ))
      :
        <div>
          {
            showCreateNameForm ?
              <RaisedButton
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
    {
      names.length && isProtected ?
        <EditNameProtectedInfoWithData
          names={names}
          onSubmitBookCall={onSubmitBookCall}
          onSubmitBookMeeting={onSubmitBookMeeting}
        />
      :
        null
    }
  </div>
);
