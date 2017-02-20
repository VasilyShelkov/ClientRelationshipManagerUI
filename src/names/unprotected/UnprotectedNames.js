import React from 'react';

import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';
import { cyan500, green500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import LoadingSpinner from '../../shared/LoadingSpinner';
import NamesListWithData from '../NamesList';
import NameDetailsDrawerWithData from '../NameDetails';
import NameDialogForm from '../NameDialog';
import AddUnprotectedNameForm from './AddUnprotectedNameForm';

export default ({
  loading, names, nameDetailsToShow, nameDetailsDrawerOpen, protectNameDialogOpen,
  removeUnprotectedName, onSubmitProtectName, openProtectNameDialog, closeProtectNameDialog,
  showingCreateForm, showCreateNameForm
}) => (
  <div
    style={{
      marginTop: '20px',
      paddingRight: nameDetailsDrawerOpen ? '300px' : undefined
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
                <AddUnprotectedNameForm />
              :
                <NamesListWithData
                  showCreateNameForm={showCreateNameForm}
                  names={names}
                />

            }
            {
              nameDetailsDrawerOpen && nameDetailsToShow < names.length ?
                <NameDetailsDrawerWithData
                  details={names[nameDetailsToShow]}
                  removeNameAction={
                    () => removeUnprotectedName(names[nameDetailsToShow].id)
                  }
                >
                  <IconButton
                    tooltip="Protect Name"
                    onClick={openProtectNameDialog}
                    touch
                  >
                    <LockClosedIcon color={cyan500} />
                  </IconButton>
                  <NameDialogForm
                    displayName={`${names[nameDetailsToShow].name.firstName} ${names[nameDetailsToShow].name.lastName}`}
                    open={protectNameDialogOpen}
                    close={closeProtectNameDialog}
                    handleSubmit={onSubmitProtectName(
                      names[nameDetailsToShow].id,
                      names[nameDetailsToShow].name.id
                    )}
                    actions={[
                      <FlatButton
                        onClick={closeProtectNameDialog}
                        label="Cancel"
                        secondary
                        icon={<CancelIcon />}
                      />,
                      <FlatButton
                        onClick={onSubmitProtectName(
                          names[nameDetailsToShow].id,
                          names[nameDetailsToShow].name.id
                        )}
                        type="submit"
                        label="Protect"
                        primary
                        icon={<LockClosedIcon />}
                      />
                    ]}
                  />
                </NameDetailsDrawerWithData>
              :
                null
            }
          </div>
      }
    </div>
  </div>
);
