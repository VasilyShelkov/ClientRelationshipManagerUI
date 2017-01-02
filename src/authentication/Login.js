import React from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CompanyLogo from 'material-ui/svg-icons/action/face';

import ErrorIcon from 'material-ui/svg-icons/alert/error';
import { red600 } from 'material-ui/styles/colors';

import { renderTextField, required, emailFormat } from '../shared/FormElements';
import LoadingSpinner from '../shared/LoadingSpinner';

import handleSignIn from './loginRequest';

export const Login = ({ loggingIn, handleSubmit, error }) => (
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
            <Paper
              className="Login__form__notification"
              style={{
                backgroundColor: red600,
                borderRadius: '10px'
              }}
              zDepth={2}
            >
              <ErrorIcon className="Login__form__notification__icon" style={{ color: 'white' }} />
              <div className="Login__form__notification__message">{error}</div>
            </Paper>
          :
            null
        }
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={renderTextField}
            label="Enter your email"
            validate={[required, emailFormat]}
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
          {
            loggingIn ?
              <LoadingSpinner />
            :
              <RaisedButton
                type="submit"
                label="Sign in"
                className="Login__form__signIn"
                primary
              />
          }
        </form>
      </Paper>
    </div>
  </div>
);

const LoginForm = reduxForm({ form: 'login' })(Login);

const mapStateToProps = state => ({
  loggingIn: state.account.loggingIn
});

const mapDispatchToProps = dispatch => ({
  onSubmit: handleSignIn
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginContainer;
