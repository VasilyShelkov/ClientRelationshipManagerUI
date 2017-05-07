import React from 'react';

import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import Paper from 'material-ui/Paper';

import LoadingSpinner from '../../../shared/LoadingSpinner';
import NamesList from '../NamesList';
import SelectedUnprotectedNameWithData from '../../selected/unprotected/SelectedUnprotectedNameWithData';
import { getNameByNameId } from '../nameListShapeShifter';

export default ({ loading, names, selectedNameId, nameActionInProgress, selectName }) => {
  const selectedUnprotected = loading ? null : getNameByNameId(names, selectedNameId);
  const selectedNameDrawerOpen = Boolean(selectedUnprotected);
  return loading
    ? <Paper>
        <LoadingSpinner />
      </Paper>
    : <div>
        <div>
          <NamesList
            id="unprotectedNamesList"
            names={names}
            selectedNameId={selectedNameId}
            openNameDetails={selectName}
            selectedNameDrawerOpen={selectedNameDrawerOpen}
          />

          <SelectedUnprotectedNameWithData
            selectedNameDrawerOpen={selectedNameDrawerOpen}
            selectedUnprotected={selectedUnprotected}
          />
        </div>
      </div>;
};
