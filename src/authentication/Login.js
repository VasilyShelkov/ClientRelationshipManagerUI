import React from 'react';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CompanyLogo from 'material-ui/svg-icons/action/face';

export const Login = () => (
  <div>
    <div className="row center-xs">
      <CompanyLogo />
      <h1>Sign in to CRM</h1>
    </div>

    <div className="row center-xs">
      <Paper className="Login__form" zDepth={1}>
        <form onSubmit={() => {}}>
          <Field name="email" component={TextField} floatingLabelText="Enter your email" />
          <br />
          <Field
            name="password"
            type="password"
            component={TextField}
            floatingLabelText="Enter your password"
          />
          <br />
          <RaisedButton
            type="submit"
            label="Sign in"
            className="Login__form__signIn"
            primary
          />
        </form>
      </Paper>
    </div>
  </div>
);

export default reduxForm({ form: 'login' })(Login);
