import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import EditIcon from 'material-ui/svg-icons/content/create';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import SecurityIcon from 'material-ui/svg-icons/hardware/security';
import UpdatedIcon from 'material-ui/svg-icons/action/update';
import SuccessfulUpdateIcon from 'material-ui/svg-icons/action/done';
import { cyan500, green900, lightGreen300 } from 'material-ui/styles/colors';

import EditPassword from './EditPassword';
import {
  editProfile, editProfilePassword, cancelEditProfilePassword
} from '../profileActions';

export const ShowProfile = ({
  userId, firstName, lastName, email, phone, updatedAt, editingPassword,
  editSuccessProfileNotification, onEditProfile, onEditProfilePassword,
  onCancelEditProfilePassword
}) => (
  <Paper zDepth={2} style={{ paddingBottom: '10px' }}>
    <div style={{ textAlign: 'center' }}>
      <ProfileIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
      <h2>{firstName} {lastName}</h2>
    </div>


    <List >
      <Divider />

      <ListItem
        leftAvatar={<Avatar icon={<EmailIcon />} backgroundColor={cyan500} />}
        primaryText={email}
        disabled
      />
      <ListItem
        leftAvatar={<Avatar icon={<PhoneIcon />} backgroundColor={cyan500} />}
        primaryText={phone}
        disabled
      />

      <Divider />

      {
        editingPassword ?
          <EditPassword
            userId={userId}
            handleCancelEditProfilePassword={onCancelEditProfilePassword}
          />
        :
          <ListItem
            leftAvatar={<Avatar icon={<SecurityIcon />} backgroundColor={cyan500} />}
            rightIcon={<EditIcon />}
            primaryText="Password"
            secondaryText="**********"
            onClick={onEditProfilePassword}
          />
      }

      <Divider />
    </List>


    <div className="Profile__last-updated row justify-content-center">
      {
        (editSuccessProfileNotification) &&
          <Chip
            backgroundColor={lightGreen300}
            onRequestDelete={() => ('delete notification')}
            onTouchTap={() => ('delete notification 2')}
          >
            <Avatar
              size={32}
              icon={<SuccessfulUpdateIcon />}
              color={lightGreen300}
              backgroundColor={green900}
            />
            {editSuccessProfileNotification}
          </Chip>
      }

      <Chip backgroundColor={editSuccessProfileNotification ? lightGreen300 : null}>
        <Avatar size={32} icon={<UpdatedIcon />} backgroundColor={cyan500} />
        Last Updated: {moment(updatedAt).fromNow()}
      </Chip>
    </div>
    <div className="Profile__cta row justify-content-center">
      <RaisedButton
        primary
        label="Edit Profile"
        icon={<EditIcon />}
        onClick={onEditProfile}
      />
    </div>
  </Paper>
);

const mapStateToProps = state => ({
  editSuccessProfileNotification: state.profile.notification.profile,
  editingPassword: state.profile.editing.password,
});

const mapDispatchToProps = dispatch => ({
  onEditProfile: () => dispatch(editProfile()),
  onEditProfilePassword: () => dispatch(editProfilePassword()),
  onCancelEditProfilePassword: () => dispatch(cancelEditProfilePassword()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowProfile);
