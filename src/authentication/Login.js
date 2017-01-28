import React from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CompanyLogo from 'material-ui/svg-icons/action/face';

import { FromErrorNotification, renderTextField, required, emailFormat } from '../shared/FormElements';
import LoadingSpinner from '../shared/LoadingSpinner';

import handleSignIn from './loginRequest';

export const Login = ({ loggingIn, handleSubmit, error }) => (
  <div className="container">
    <div className="row">
      <div className="col" style={{ textAlign: 'center' }}>
        <CompanyLogo style={{ height: '100px', width: '100px' }} />
        <br />
        <h1>Sign in to CRM</h1>
        <br />
      </div>
    </div>

    <div className="row">
      <div className="col-12">
        <Paper className="Login__form" zDepth={1}>
          <FromErrorNotification message={error} zDepth={2} />
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
  </div>
);

const LoginForm = reduxForm({ form: 'login' })(Login);

const mapStateToProps = state => ({
  loggingIn: state.account.loggingIn
});

const mapDispatchToProps = () => ({
  onSubmit: handleSignIn
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginContainer;
