import React from 'react';

import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';
import { cyan500, green500 } from 'material-ui/styles/colors';

import LoadingSpinner from '../../shared/LoadingSpinner';
import NamesListWithData from '../NamesList';
import AddUnprotectedNameFormWithData from './add/UnprotectedNameFormWithData';
import SelectedUnprotectedNameWithData from './selected/SelectedUnprotectedNameWithData';

export default ({
  loading, names, selectedNameDrawerOpen, showingCreateForm,
  showCreateNameForm, selectUnprotectedName
}) => (
  <div
    style={{
      marginTop: '20px',
      paddingRight: selectedNameDrawerOpen ? '310px' : undefined
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <LockOpenIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>
          {
            showingCreateForm ?
              'Create Unprotected Name'
            :
              `${names ? names.length : ''} Unprotected Name${!names || names.length > 1 ? 's' : ''}`
          }
        </h2>
        {
          names && names.length ?
            <IconButton onClick={showCreateNameForm}>
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
                <NamesListWithData
                  openNameDetails={selectUnprotectedName}
                  showCreateNameForm={showCreateNameForm}
                  names={names}
                />
            }

            <SelectedUnprotectedNameWithData
              names={names}
              selectedNameDrawerOpen={selectedNameDrawerOpen}
            />
          </div>
      }
    </div>
  </div>
);
