import React from 'react';

import Paper from 'material-ui/Paper';

import LoadingSpinner from '../../shared/LoadingSpinner';
import { ProtectedIcon, MetWithProtectedIcon, ClientsIcon } from '../../app/icons';
import NamesList from '../NamesList';
import NameListHeader from '../NameListHeader';
import SelectedProtectedNameWithData from './selected/SelectedProtectedNameWithData';

export default ({
  loading, names, nameListType, selectedNameDrawerOpen, selectedNamePosition,
  nameActionInProgress, selectProtectedName,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog,
  onSubmitBookMeeting, onSubmitBookCall
}) => (
  <div style={{ marginTop: '10px' }}>
    <div className={nameActionInProgress && 'names__content'}>
      {getNameListHeader(nameListType, names && names.length)}
      <div>
        {
          loading ?
            <Paper>
              <LoadingSpinner />
            </Paper>
          :
            <div>
              <NamesList
                openNameDetails={selectProtectedName}
                names={names}
                selectedNamePosition={selectedNamePosition}
                openEditProtectedNameCallDialog={openEditProtectedNameCallDialog}
                openEditProtectedNameMeetingDialog={openEditProtectedNameMeetingDialog}
                onSubmitBookMeeting={onSubmitBookMeeting}
                onSubmitBookCall={onSubmitBookCall}
                isProtected
              />

              <SelectedProtectedNameWithData
                names={names}
                selectedNameDrawerOpen={selectedNameDrawerOpen}
                selectedNamePosition={selectedNamePosition}
              />
            </div>
        }
      </div>
    </div>

    {
      nameActionInProgress &&
      <div className="names__overlay">
        <LoadingSpinner />
        {nameActionInProgress}
      </div>
    }
  </div>
);

const getNameListHeader = (nameListType, isMultipleNames) => {
  if (nameListType === 'protected') {
    return (
      <NameListHeader
        title={`${isMultipleNames ? `${isMultipleNames}/150` : ''} Protected Name${isMultipleNames ? 's' : ''}`}
        Icon={ProtectedIcon}
      />
    );
  }

  if (nameListType === 'metWithProtected') {
    return (
      <NameListHeader
        title={`${isMultipleNames ? '' : `${isMultipleNames}`} Met With Protected Name${isMultipleNames ? 's' : ''}`}
        Icon={MetWithProtectedIcon}
      />
    );
  }

  return (
    <NameListHeader
      title={`${isMultipleNames ? '' : `${isMultipleNames}`} Client${isMultipleNames ? 's' : ''}`}
      Icon={ClientsIcon}
    />
  );
};

