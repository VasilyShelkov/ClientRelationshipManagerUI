import React from 'react';
import moment from 'moment';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { cyan500 } from 'material-ui/styles/colors';

import CompanyIcon from 'material-ui/svg-icons/communication/business';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import UpdatedIcon from 'material-ui/svg-icons/action/update';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

export default ({
  name, address, phone, createdAt, updatedAt, onEditCompany
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
          style={{ color: 'white'}}
          leftAvatar={<Avatar icon={<LocationIcon />} backgroundColor="#FFFFFF" color={cyan500} />}
          primaryText={address}
          disabled
        />
        <ListItem
          style={{ color: 'white'}}
          leftAvatar={<Avatar icon={<PhoneIcon />} backgroundColor="#FFFFFF" color={cyan500} />}
          primaryText={phone}
          disabled
        />
      </List>
    </div>

    <Divider />

    <div className="Profile__last-updated row justify-content-center">
      <Chip>
        <Avatar size={32} icon={<UpdatedIcon />} backgroundColor="#FFFFFF" color={cyan500} />
        Last Updated: {moment(updatedAt).fromNow()}
      </Chip>
    </div>
    <div className="Profile__cta row justify-content-center">
      <RaisedButton label="Edit Company" icon={<EditIcon />} />
    </div>
  </div>
);
