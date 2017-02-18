import React from 'react';

import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500 } from 'material-ui/styles/colors';

import LoadingSpinner from '../../shared/LoadingSpinner';
import NamesListWithData from '../NamesList';
import NameDetailsDrawerWithData from '../NameDetails';

export default ({
  loading, names, nameDetailsToShow, nameDetailsDrawerOpen, removeUnprotectedName
}) => (
  <div
    style={{
      marginTop: '20px',
      paddingRight: nameDetailsDrawerOpen ? '300px' : undefined
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <LockOpenIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
      <h2>Unprotected Names</h2>
    </div>
    <div>
      {
        loading ?
          <Paper>
            <LoadingSpinner />
          </Paper>
        :
          <div>
            <NamesListWithData names={names} />

            {
              nameDetailsDrawerOpen && nameDetailsToShow < names.length ?
                <NameDetailsDrawerWithData
                  open={nameDetailsDrawerOpen}
                  details={names[nameDetailsToShow]}
                  removeNameAction={() => removeUnprotectedName(names[nameDetailsToShow].id)}
                >
                  <IconButton tooltip="Protect Name" touch>
                    <LockClosedIcon color={cyan500} />
                  </IconButton>
                </NameDetailsDrawerWithData>
              :
                null
            }
          </div>
      }
    </div>
  </div>
);
