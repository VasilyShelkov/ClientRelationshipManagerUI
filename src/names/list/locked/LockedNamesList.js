import React from 'react';

import Paper from 'material-ui/Paper';

import LoadingSpinner from '../../../shared/LoadingSpinner';
import NamesList from '../NamesList';
import NameListHeader from '../NameListHeader';
import EditLockedName from './EditLockedNameInfo';
import SelectedProtectedNameWithData from '../../selected/protected/SelectedProtectedNameWithData';
import SelectedClientsWithData from '../../selected/client/SelectedClientsWithData';

export default ({
  loading,
  names,
  nameListType,
  selectedName,
  selectedNameDrawerOpen,
  selectName,
  openEditProtectedNameMeetingDialog,
  openEditProtectedNameCallDialog,
  onSubmitBookCall,
  onSubmitBookMeeting
}) => (
  <div style={{ marginTop: '10px' }}>
    {!loading && names
      ? <div>
          <NamesList
            id={`${nameListType}NamesList`}
            names={names}
            selectedNameId={Boolean(selectedName) && selectedName.name.id}
            openNameDetails={selectName(nameListType)}
            openEditProtectedNameCallDialog={openEditProtectedNameCallDialog}
            openEditProtectedNameMeetingDialog={openEditProtectedNameMeetingDialog}
            selectedNameDrawerOpen={selectedNameDrawerOpen}
            isProtected
          />

          <EditLockedName names={names} onSubmitBookCall={onSubmitBookCall} onSubmitBookMeeting={onSubmitBookMeeting} />
          {getSelectedName(nameListType, selectedName, selectedNameDrawerOpen)}
        </div>
      : <Paper>
          <LoadingSpinner />
        </Paper>}
  </div>
);

const getSelectedName = (nameListType, selectedName, selectedNameDrawerOpen) => {
  if (nameListType === 'protected' || nameListType === 'metWithProtected') {
    return (
      <SelectedProtectedNameWithData selectedProtected={selectedName} selectedNameDrawerOpen={selectedNameDrawerOpen} />
    );
  }

  return <SelectedClientsWithData selectedClient={selectedName} selectedNameDrawerOpen={selectedNameDrawerOpen} />;
};
