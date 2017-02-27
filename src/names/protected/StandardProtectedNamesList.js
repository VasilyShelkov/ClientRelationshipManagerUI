import React from 'react';

import Paper from 'material-ui/Paper';

import LoadingSpinner from '../../shared/LoadingSpinner';
import { ProtectedIcon, MetWithProtectedIcon, ClientsIcon } from '../../app/icons';
import NamesList from '../NamesList';
import NameListHeader from '../NameListHeader';
import SelectedProtectedNameWithData from './selected/SelectedProtectedNameWithData';

export default ({
  loading, names, nameListType, selectedNameId,
  selectedProtected, selectedNameDrawerOpen,
  nameActionInProgress, selectName,
  openEditProtectedNameMeetingDialog, openEditProtectedNameCallDialog,
  onSubmitBookMeeting, onSubmitBookCall
}) => (
  <div style={{ marginTop: '10px' }}>
    <div className={nameActionInProgress && 'names__content'}>
      {getNameListHeader(nameListType, names && names.length)}
      <div>
        {
          !loading && names ?
            <div>
              <NamesList
                names={names}
                selectedNameId={selectedNameId}
                openNameDetails={selectName}
                openEditProtectedNameCallDialog={openEditProtectedNameCallDialog}
                openEditProtectedNameMeetingDialog={openEditProtectedNameMeetingDialog}
                onSubmitBookMeeting={onSubmitBookMeeting}
                onSubmitBookCall={onSubmitBookCall}
                isProtected
              />

              <SelectedProtectedNameWithData
                selectedProtected={selectedProtected}
                selectedNameDrawerOpen={selectedNameDrawerOpen}
              />
            </div>
          :
            <Paper>
              <LoadingSpinner />
            </Paper>
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

