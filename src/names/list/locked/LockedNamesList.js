import React from 'react';

import Paper from 'material-ui/Paper';

import LoadingSpinner from '../../../shared/LoadingSpinner';
import { ProtectedIcon, MetWithProtectedIcon, ClientsIcon } from '../../../app/icons';
import NamesList from '../NamesList';
import NameListHeader from '../NameListHeader';
import SelectedProtectedNameWithData from '../../selected/protected/SelectedProtectedNameWithData';
import SelectedClientsWithData from '../../selected/client/SelectedClientsWithData';

export default ({
  loading,
  names,
  nameListType,
  selectedName,
  selectedNameDrawerOpen,
  nameActionInProgress,
  selectName,
  protectedNamesLimit,
  openEditProtectedNameMeetingDialog,
  openEditProtectedNameCallDialog
}) => (
  <div style={{ marginTop: '10px' }}>
    <div className={nameActionInProgress && 'names__content'}>
      {getNameListHeader(nameListType, names && names.length, protectedNamesLimit)}
      <div>
        {!loading && names
          ? <div>
              <NamesList
                id={`${nameListType}NamesList`}
                names={names}
                selectedNameId={Boolean(selectedName) && selectedName.name.id}
                openNameDetails={selectName}
                openEditProtectedNameCallDialog={openEditProtectedNameCallDialog}
                openEditProtectedNameMeetingDialog={openEditProtectedNameMeetingDialog}
                selectedNameDrawerOpen={selectedNameDrawerOpen}
                isProtected
              />

              {getSelectedName(nameListType, selectedName, selectedNameDrawerOpen)}
            </div>
          : <Paper>
              <LoadingSpinner />
            </Paper>}
      </div>
    </div>

    {nameActionInProgress &&
      <div className="names__overlay">
        <LoadingSpinner />
        {nameActionInProgress}
      </div>}
  </div>
);

const getNameListHeader = (nameListType, isMultipleNames, protectedNamesLimit) => {
  if (nameListType === 'protected') {
    return (
      <NameListHeader
        countId="protectedNamesCount"
        nameCount={isMultipleNames}
        title={`${isMultipleNames !== false && protectedNamesLimit ? `/${protectedNamesLimit}` : ''} Protected Name${isMultipleNames === 1 ? '' : 's'}`}
        Icon={ProtectedIcon}
      />
    );
  }

  if (nameListType === 'metWithProtected') {
    return (
      <NameListHeader
        countId="metWithProtectedNamesCount"
        nameCount={isMultipleNames}
        title={` Met With Protected Name${isMultipleNames === 1 ? '' : 's'}`}
        Icon={MetWithProtectedIcon}
      />
    );
  }

  return (
    <NameListHeader
      countId="clientsCount"
      nameCount={isMultipleNames}
      title={` Client${isMultipleNames === 1 ? '' : 's'}`}
      Icon={ClientsIcon}
    />
  );
};

const getSelectedName = (nameListType, selectedName, selectedNameDrawerOpen) => {
  if (nameListType === 'protected' || nameListType === 'metWithProtected') {
    return (
      <SelectedProtectedNameWithData selectedProtected={selectedName} selectedNameDrawerOpen={selectedNameDrawerOpen} />
    );
  }

  return <SelectedClientsWithData selectedClient={selectedName} selectedNameDrawerOpen={selectedNameDrawerOpen} />;
};
