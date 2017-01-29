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
  editProfile, editProfilePassword, cancelEditProfilePassword,
  removeProfileNotification
} from '../profileActions';
import { EDIT_IN_PROGRESS } from '../profileReducer';

export const ShowProfile = ({
  userId, firstName, lastName, email, phone, updatedAt, editingPassword,
  editSuccessProfileNotification, onEditProfile, onEditProfilePassword,
  onCancelEditProfilePassword, onRemoveNotification
}) => (
  <Paper zDepth={2} style={{ paddingBottom: '10px', margin: '20px 0px' }}>
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
            editInProgress={editingPassword === EDIT_IN_PROGRESS}
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


    <div className="Profile__meta-info">
      <div className="row justify-content-center">
        {
          editSuccessProfileNotification &&
            <Chip
              style={{ marginBottom: '10px' }}
              backgroundColor={lightGreen300}
              onRequestDelete={onRemoveNotification}
              onTouchTap={onRemoveNotification}
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

      </div>
      <div className="row justify-content-center">
        <Chip>
          <Avatar size={32} icon={<UpdatedIcon />} backgroundColor={cyan500} />
          <strong>Last Updated</strong>: {moment(updatedAt).fromNow()}
        </Chip>
      </div>
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
  onRemoveNotification: () => dispatch(removeProfileNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowProfile);
