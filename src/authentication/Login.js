import React from 'react';

import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CompanyLogo from 'material-ui/svg-icons/action/face';
import ErrorIcon from 'material-ui/svg-icons/alert/error';

import handleSignIn from './loginRequest';

const required = value => (value ? undefined : 'Required');
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const email = value => (emailRegex.test(value) ? undefined : 'Not a valid email address');

const renderTextField = ({ input, label, meta: { touched, error }, ...customProps }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...customProps}
  />
);

export const Login = ({ handleSubmit, error }) => (
  <div>
    <div className="row center-xs">
      <CompanyLogo />
      <br />
      <h1>Sign in to CRM</h1>
      <br />
    </div>

    <div className="row center-xs">
      <Paper className="Login__form" zDepth={1}>
        {
          error ?
            <Paper zDepth={2}>
              <ErrorIcon />
              <strong>{error}</strong>
            </Paper>
          :
            null
        }
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={renderTextField}
            label="Enter your email"
            validate={[required, email]}
          />
          <br />
          <Field
            name="password"
            type="password"
            component={renderTextField}
            label="Enter your password"
            validate={required}
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

const LoginForm = reduxForm({ form: 'login' })(Login);

export default () => <LoginForm onSubmit={handleSignIn} />;
