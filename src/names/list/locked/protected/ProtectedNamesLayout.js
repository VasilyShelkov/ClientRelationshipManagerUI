import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';

import { ProtectedIcon, MetWithProtectedIcon } from '../../../../app/icons';
import LockedNamesListWithData from '../LockedNamesListWithData';
import EditLockedName from '../EditLockedNameInfo';
import { getNameByNameId } from '../../nameListShapeShifter';

export default ({
  id,
  loadingProtected,
  protectedNames,
  protectedNamesLimit,
  loadingMetWithProtected,
  metWithProtectedNames,
  selectedNameId,
  listToShow,
  changeShownProtectedList,
  onSubmitBookCall,
  onSubmitBookMeeting
}) => {
  const selectedProtected = getNameByNameId(protectedNames, selectedNameId);
  const selectedProtectedNameDrawerOpen = Boolean(selectedProtected) && listToShow === 'protected';

  const selectedMetWithProtected = getNameByNameId(metWithProtectedNames, selectedNameId);
  const selectedMetWithProtectedNameDrawerOpen = Boolean(selectedMetWithProtected) && listToShow === 'metWithProtected';
  const selectedNameDrawerOpen = selectedProtectedNameDrawerOpen || selectedMetWithProtectedNameDrawerOpen;

  return (
    <div>
      <Tabs
        className={selectedNameDrawerOpen && 'protected__container__names'}
        style={{ marginTop: '20px' }}
        value={listToShow}
        onChange={changeShownProtectedList}
      >
        <Tab
          id="goToProtectedTab"
          label="PROTECTED"
          value="protected"
          icon={loadingProtected ? <CircularProgress /> : <ProtectedIcon />}
        >
          <LockedNamesListWithData
            userId={id}
            loading={loadingProtected}
            names={protectedNames}
            selectedName={selectedProtected}
            selectedNameDrawerOpen={selectedProtectedNameDrawerOpen}
            nameListType="protected"
            protectedNamesLimit={protectedNamesLimit}
          />
        </Tab>

        <Tab
          id="goToMetWithProtectedTab"
          label="MET WITH"
          value="metWithProtected"
          icon={loadingMetWithProtected ? <CircularProgress /> : <MetWithProtectedIcon />}
        >
          <LockedNamesListWithData
            userId={id}
            loading={loadingMetWithProtected}
            names={metWithProtectedNames}
            selectedName={selectedMetWithProtected}
            selectedNameDrawerOpen={selectedMetWithProtectedNameDrawerOpen}
            nameListType="metWithProtected"
          />
        </Tab>
      </Tabs>
      {protectedNames && metWithProtectedNames
        ? <EditLockedName
            names={[...protectedNames, ...metWithProtectedNames]}
            onSubmitBookCall={onSubmitBookCall}
            onSubmitBookMeeting={onSubmitBookMeeting}
          />
        : null}
    </div>
  );
};
