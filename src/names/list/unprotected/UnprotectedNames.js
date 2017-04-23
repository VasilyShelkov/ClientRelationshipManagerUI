import React from 'react';

import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';
import { cyan500, green500 } from 'material-ui/styles/colors';

import LoadingSpinner from '../../../shared/LoadingSpinner';
import NamesList from '../NamesList';
import AddUnprotectedNameFormWithData from './add/UnprotectedNameFormWithData';
import SelectedUnprotectedNameWithData from '../../selected/unprotected/SelectedUnprotectedNameWithData';
import { getNameByNameId } from '../nameListShapeShifter';

export default ({
  loading, names, selectedNameId, showingCreateForm, nameActionInProgress,
  showCreateNameForm, selectName
}) => {
  const selectedUnprotected = loading ? null : getNameByNameId(names, selectedNameId);
  const selectedNameDrawerOpen = Boolean(selectedUnprotected);
  return (
    <div className={selectedUnprotected && !showingCreateForm &&'unprotected__container__names'}>
      <div className={nameActionInProgress && 'names__content'}>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <LockOpenIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
              showingCreateForm ?
                <h2>Create Unprotected Name</h2>
              :
                <h2>
                  <span id="unprotectedNamesCount">{names ? names.length : ''}</span> Unprotected Name{!names || names.length === 1 ? '' : 's'}
                </h2>
            }
            {
              (names && names.length) && !showingCreateForm ?
                <IconButton id="createUnprotectedName" onClick={showCreateNameForm}>
                  <Avatar icon={<AddIcon />} backgroundColor={green500} />
                </IconButton>
              :
                null
            }
          </div>
        </div>
        <div>
          {
            loading ?
              <Paper>
                <LoadingSpinner />
              </Paper>
            :
              <div>
                {
                  showingCreateForm ?
                    <AddUnprotectedNameFormWithData
                      selectedNameDrawerOpen={selectedNameDrawerOpen}
                    />
                  :
                    <div>
                      <NamesList
                        id="unprotectedNamesList"
                        names={names}
                        selectedNameId={selectedNameId}
                        openNameDetails={selectName}
                        showCreateNameForm={showCreateNameForm}
                        selectedNameDrawerOpen={selectedNameDrawerOpen}
                      />

                      <SelectedUnprotectedNameWithData
                        selectedNameDrawerOpen={selectedNameDrawerOpen}
                        selectedUnprotected={selectedUnprotected}
                      />
                    </div>
                }

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
};
