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

import { editCompany, removeProfileNotification } from '../profileActions';

export const ShowCompany = ({
  name, address, phone, updatedAt, editSuccessCompanyNotification,
  onEditCompany, onRemoveNotification
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

    <div className="Profile__meta-info">
      <div className="row justify-content-center">
        {
          (editSuccessCompanyNotification) &&
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
              {editSuccessCompanyNotification}
            </Chip>
        }
      </div>
      <div className="row justify-content-center">
        <Chip>
          <Avatar size={32} icon={<UpdatedIcon />} backgroundColor="#FFFFFF" color={cyan500} />
          <strong>Last Updated</strong>: {moment(updatedAt).fromNow()}
        </Chip>
      </div>
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
  onEditCompany: () => dispatch(editCompany()),
  onRemoveNotification: () => dispatch(removeProfileNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCompany);
