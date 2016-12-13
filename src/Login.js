import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CompanyLogo from 'material-ui/svg-icons/action/face';

export default () => (
  <div>
    <div className="row center-xs">
      <CompanyLogo />
      <h1>Sign in to CRM</h1>
    </div>

    <div className="row center-xs">
      <Paper zDepth={1}>
        <TextField
          floatingLabelText="Enter your email"
        />
        <br />
        <TextField
          floatingLabelText="Enter your password"
        />
        <RaisedButton label="Sign in" fullWidth />
      </Paper>
    </div>
  </div>
);
