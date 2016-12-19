import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/content/create';

export default ({ firstName, lastName, email, phone, onEditProfile }) => (
  <Paper zDepth={2} >
    <div className="Profile__details">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <h4 className="Profile__details__field">First name:</h4>
          {firstName}
        </div>

        <div className="col-xs-12 col-sm-6">
          <h4 className="Profile__details__field">Last name:</h4>
          {lastName}
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <h4 className="Profile__details__field">Email:</h4>
          {email}
        </div>

        <div className="col-xs-12 col-sm-6">
          <h4 className="Profile__details__field">phone:</h4>
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
