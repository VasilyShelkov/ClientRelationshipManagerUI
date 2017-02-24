import React from 'react';

import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import Paper from 'material-ui/Paper';
import { cyan500 } from 'material-ui/styles/colors';

import LoadingSpinner from '../../shared/LoadingSpinner';
import NamesList from '../NamesList';
import SelectedProtectedNameWithData from './selected/SelectedProtectedNameWithData';

export default ({
  loading, names, selectedNameDrawerOpen, selectedNamePosition,
  nameActionInProgress, selectProtectedName
}) => (
  <div
    style={{
      marginTop: '20px',
      paddingRight: selectedNameDrawerOpen ? '250px' : undefined
    }}
  >
    <div className={nameActionInProgress && 'names__content'}>
      <div style={{ textAlign: 'center' }}>
        <LockClosedIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>
            {`${names ? `${names.length}/150` : ''} Protected Name${!names || names.length > 1 ? 's' : ''}`}
          </h2>
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
              <NamesList
                openNameDetails={selectProtectedName}
                names={names}
                selectedNamePosition={selectedNamePosition}
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
