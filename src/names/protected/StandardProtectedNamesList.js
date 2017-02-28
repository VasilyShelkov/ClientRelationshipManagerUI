import React from 'react';

import Paper from 'material-ui/Paper';

import LoadingSpinner from '../../shared/LoadingSpinner';
import { ProtectedIcon, MetWithProtectedIcon, ClientsIcon } from '../../app/icons';
import NamesList from '../NamesList';
import NameListHeader from '../NameListHeader';
import SelectedProtectedNameWithData from './selected/SelectedProtectedNameWithData';
import SelectedClientsWithData from './client/SelectedClientsWithData';

export default ({
  loading, names, nameListType, selectedNameId,
  selectedName, selectedNameDrawerOpen,
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

              {getSelectedName(nameListType, selectedName, selectedNameDrawerOpen)}
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

const getSelectedName = (nameListType, selectedName, selectedNameDrawerOpen) => {
  if (nameListType === 'protected' || nameListType === 'metWithProtected') {
    return (
      <SelectedProtectedNameWithData
        selectedProtected={selectedName}
        selectedNameDrawerOpen={selectedNameDrawerOpen}
      />
    );
  }

  return (
    <SelectedClientsWithData
      selectedClient={selectedName}
      selectedNameDrawerOpen={selectedNameDrawerOpen}
    />
  );
};
