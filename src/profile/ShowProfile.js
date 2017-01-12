import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/content/create';

export default ({ firstName, lastName, email, phone, onEditProfile }) => (
  <Paper zDepth={2}>
    <div className="Profile__details">
      <div className="Profile__details__field row middle-sm">
        <div className="col-xs-12 col-sm-2">
          <h4 className="Profile__details__field__name">First name:</h4>
        </div>
        <div className="col-xs-12 col-sm">
          {firstName}
        </div>
      </div>

      <Divider />

      <div className="Profile__details__field row middle-sm">
        <div className="col-xs-12 col-sm-2">
          <h4 className="Profile__details__field__name">Last name:</h4>
        </div>
        <div className="col-xs-12 col-sm">
          {lastName}
        </div>
      </div>

      <Divider />

      <div className="Profile__details__field row middle-sm">
        <div className="col-xs-12 col-sm-2">
          <h4 className="Profile__details__field__name">Email:</h4>
        </div>
        <div className="col-xs-12 col-sm">
          {email}
        </div>
      </div>

      <Divider />

      <div className="Profile__details__field row middle-sm">
        <div className="col-xs-12 col-sm-2">
          <h4 className="Profile__details__field__name">phone:</h4>
        </div>
        <div className="col-xs-12 col-sm">
          {phone}
        </div>
      </div>
    </div>

    <RaisedButton
      primary
      fullWidth
      label="Edit profile"
      icon={<EditIcon />}
      onClick={onEditProfile}
    />
  </Paper>
);
