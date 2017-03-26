import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';

import { ProtectedIcon, MetWithProtectedIcon } from '../../app/icons';
import StandardProtectedNamesWithData from './StandardProtectedNamesWithData';
import EditNameProtectedInfoWithData from '../edit/EditNameProtectedInfo';
import { getNameByNameId } from '../nameListShapeShifter';

export default ({
  id, loadingProtected, protectedNames,
  loadingMetWithProtected, metWithProtectedNames,
  selectedNameId, listToShow, changeShownProtectedList,
  onSubmitBookCall, onSubmitBookMeeting
}) => {
  const selectedProtected = getNameByNameId(protectedNames, selectedNameId);
  const selectedProtectedNameDrawerOpen = Boolean(selectedProtected) && listToShow === 'protected';

  const selectedMetWithProtected = getNameByNameId(metWithProtectedNames, selectedNameId);
  const selectedMetWithProtectedNameDrawerOpen = Boolean(selectedMetWithProtected) && listToShow === 'metWithProtected';
  const selectedNameDrawerOpen = (
    selectedProtectedNameDrawerOpen || selectedMetWithProtectedNameDrawerOpen
  );

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
          <StandardProtectedNamesWithData
            userId={id}
            loading={loadingProtected}
            names={protectedNames}
            selectedName={selectedProtected}
            selectedNameDrawerOpen={selectedProtectedNameDrawerOpen}
            selectedNameId={selectedNameId}
            nameListType="protected"
          />
        </Tab>

        <Tab
          id="goToMetWithProtectedTab"
          label="MET WITH"
          value="metWithProtected"
          icon={loadingMetWithProtected ? <CircularProgress /> : <MetWithProtectedIcon />}
        >
          <StandardProtectedNamesWithData
            userId={id}
            loading={loadingMetWithProtected}
            names={metWithProtectedNames}
            selectedName={selectedMetWithProtected}
            selectedNameDrawerOpen={selectedMetWithProtectedNameDrawerOpen}
            selectedNameId={selectedNameId}
            nameListType="metWithProtected"
          />
        </Tab>
      </Tabs>
      {
        protectedNames && metWithProtectedNames ?
          <EditNameProtectedInfoWithData
            names={[...protectedNames, ...metWithProtectedNames]}
            onSubmitBookCall={onSubmitBookCall}
            onSubmitBookMeeting={onSubmitBookMeeting}
          />
        :
          null
      }
    </div>
  );
};
