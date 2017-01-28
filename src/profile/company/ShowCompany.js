import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

import CompanyIcon from 'material-ui/svg-icons/communication/business';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import UpdatedIcon from 'material-ui/svg-icons/action/update';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SuccessfulUpdateIcon from 'material-ui/svg-icons/action/done';
import { cyan500, green900, lightGreen300 } from 'material-ui/styles/colors';

import { editCompany } from '../profileActions';

export const ShowCompany = ({
  name, address, phone, updatedAt, editSuccessCompanyNotification,
  onEditCompany
}) => (
  <div className="container">
    <div style={{ textAlign: 'center' }}>
      <CompanyIcon style={{ height: '100px', width: '100px', color: 'white' }} />
      <h2>{name}</h2>
    </div>

    <Divider />

    <div className="row">
      <List >
        <ListItem
          style={{ color: 'white' }}
          leftAvatar={<Avatar icon={<LocationIcon />} backgroundColor="#FFFFFF" color={cyan500} />}
          primaryText={address}
          disabled
        />
        <ListItem
          style={{ color: 'white' }}
          leftAvatar={<Avatar icon={<PhoneIcon />} backgroundColor="#FFFFFF" color={cyan500} />}
          primaryText={phone}
          disabled
        />
      </List>
    </div>

    <Divider />

    <div className="Profile__last-updated row justify-content-center">
      {
        (editSuccessCompanyNotification) &&
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
            {editSuccessCompanyNotification}
          </Chip>
      }
      <Chip backgroundColor={editSuccessCompanyNotification}>
        <Avatar size={32} icon={<UpdatedIcon />} backgroundColor="#FFFFFF" color={cyan500} />
        <strong>Last Updated</strong>: {moment(updatedAt).fromNow()}
      </Chip>
    </div>
    <div className="Profile__cta row justify-content-center">
      <RaisedButton label="Edit Company" icon={<EditIcon />} onClick={onEditCompany} />
    </div>
  </div>
);

const mapStateToProps = state => ({
  editSuccessCompanyNotification: state.profile.notification.company
});

const mapDispatchToProps = dispatch => ({
  onEditCompany: () => dispatch(editCompany())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCompany);
