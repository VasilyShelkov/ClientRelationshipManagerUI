import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import toMaterialStyle from 'material-color-hash';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import EditIcon from '@material-ui/icons/Edit';
import ProfileIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import SecurityIcon from '@material-ui/icons/Security';
import UpdateIcon from '@material-ui/icons/Update';
import SuccessfulUpdateIcon from '@material-ui/icons/Check';
import SuccessfullyCreatedIcon from '@material-ui/icons/CheckCircle';
import { green700 } from 'material-ui/styles/colors';
import { makeStyles } from '@material-ui/styles';

import { ProtectedIcon } from '../../app/icons';
import Notification from '../../shared/Notification';
import EditPassword from './EditPassword';
import {
  editProfile,
  editProfilePassword,
  cancelEditProfilePassword,
  removeProfileNotification,
} from '../profileActions';
import { EDIT_IN_PROGRESS } from '../profileReducer';

const useStyles = (firstName, lastName) =>
  makeStyles(theme => {
    return {
      root: {
        paddingBottom: '10px',
        margin: '20px 0px',
      },
      profileIcon: {
        height: '100px',
        width: '100px',
        position: 'relative',
        display: 'inline-block',
        left: '20px',
      },
      profileAvatar: {
        ...toMaterialStyle(
          `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`,
        ),
        position: 'relative',
        top: '-60px',
        right: '50px',
        display: 'inline-flex',
      },
      avatar: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
      },
    };
  });
export const ShowProfile = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  updated_at,
  protectedNamesLimit,
  newUserNotification,
  editingPassword,
  editSuccessProfileNotification,
  onEditProfile,
  onEditProfilePassword,
  onCancelEditProfilePassword,
  onRemoveNotification,
}) => {
  const styles = useStyles(firstName, lastName)();
  return (
    <Paper zDepth={2} className={styles.root}>
      <div style={{ textAlign: 'center', padding: '0px 10px' }}>
        <div style={{ height: '85px' }}>
          <ProfileIcon color="primary" className={styles.profileIcon} />
          <Avatar className={styles.profileAvatar}>
            {firstName[0].toUpperCase()}
            {lastName[0].toUpperCase()}
          </Avatar>
        </div>
        <h2>
          {firstName} {lastName}
        </h2>
        <Notification
          message={newUserNotification}
          zDepth={3}
          backgroundColor={green700}
          icon={
            <SuccessfullyCreatedIcon
              className="Form__notification__icon"
              style={{ color: 'white' }}
            />
          }
        />
      </div>

      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={styles.avatar}>
              <ProtectedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`Limit: ${protectedNamesLimit}`} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar className={styles.avatar}>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={email} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar className={styles.avatar}>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={phone} />
        </ListItem>

        <Divider />

        {editingPassword ? (
          <EditPassword
            userId={id}
            editInProgress={editingPassword === EDIT_IN_PROGRESS}
            handleCancelEditProfilePassword={onCancelEditProfilePassword}
          />
        ) : (
          <ListItem
            data-testid="resetPassword"
            button
            onClick={onEditProfilePassword}
          >
            <ListItemAvatar>
              <Avatar className={styles.avatar}>
                <SecurityIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Password" secondary="**********" />
            <ListItemSecondaryAction>
              <EditIcon />
            </ListItemSecondaryAction>
          </ListItem>
        )}
        <Divider />
      </List>

      <div className="Profile__meta-info">
        <div className="row justify-content-center">
          {editSuccessProfileNotification && (
            <Chip
              id="editProfileSuccess"
              style={{ marginBottom: '10px' }}
              color="secondary"
              icon={<SuccessfulUpdateIcon />}
              label={editSuccessProfileNotification}
              onDelete={onRemoveNotification}
            />
          )}
        </div>
        <div className="row justify-content-center">
          <Chip
            color="primary"
            icon={<UpdateIcon />}
            label={`Last Updated: ${moment(updated_at).fromNow()}`}
          />
        </div>
      </div>
      <div className="Profile__cta row justify-content-center">
        <Button
          color="primary"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEditProfile}
        >
          Edit profile
        </Button>
      </div>
    </Paper>
  );
};

const mapStateToProps = state => ({
  editSuccessProfileNotification: state.profile.notification.profile,
  editingPassword: state.profile.editing.password,
  newUserNotification: state.profile.notification.newUser,
});

const mapDispatchToProps = dispatch => ({
  onEditProfile: () => dispatch(editProfile()),
  onEditProfilePassword: () => dispatch(editProfilePassword()),
  onCancelEditProfilePassword: () => dispatch(cancelEditProfilePassword()),
  onRemoveNotification: () => dispatch(removeProfileNotification()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowProfile);
