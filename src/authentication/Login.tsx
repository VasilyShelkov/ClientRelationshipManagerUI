import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import { Paper, Button } from 'material-ui';
import { Face as CompanyLogo } from 'material-ui-icons';

import './Login.css';
import { State } from '../rootReducer';
import {
  FormErrorNotification,
  renderTextField,
  required,
  emailFormat,
} from '../shared/FormElements';
import LoadingSpinner from '../shared/LoadingSpinner';

import handleSignIn from './loginRequest';

export interface FormData {
  email: string;
  password: string;
}

export interface Props {
  loggingIn: boolean;
  returnUrl: string;
}

type InjectedProps = InjectedFormProps<FormData, Props>;
export const Login: React.StatelessComponent<Props & InjectedProps> = ({
  loggingIn,
  handleSubmit,
  error,
}) => (
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
        <Paper className="Login__form" elevation={1}>
          <FormErrorNotification message={error} zDepth={2} />
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
            {loggingIn ? (
              <LoadingSpinner />
            ) : (
              <Button
                type="submit"
                className="Login__form__signIn"
                color="primary"
              >
                Sign in
              </Button>
            )}
          </form>
        </Paper>
      </div>
    </div>
  </div>
);

const LoginForm = reduxForm<FormData, Props>({ form: 'login' })(Login);

const mapStateToProps = (state: State) => ({
  loggingIn: state.account.loggingIn,
  returnUrl: state.account.returnUrl,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: handleSignIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm as any);
