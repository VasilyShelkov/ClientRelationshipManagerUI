import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CompanyLogo from '@material-ui/icons/Face';

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
        <Typography variant="display3" gutterBottom={true}>
          Sign in to CRM
        </Typography>
        <br />
      </div>
    </div>

    <div className="row">
      <div className="col-12">
        <Paper className="Login__form" elevation={1}>
          <div className="Login__form__notification">
            <FormErrorNotification message={error} zDepth={2} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="Login__form__field">
              <Field
                name="email"
                component={renderTextField}
                label="Enter your email"
                validate={[required, emailFormat]}
              />
            </div>
            <div className="Login__form__field">
              <Field
                name="password"
                type="password"
                component={renderTextField}
                label="Enter your password"
                validate={required}
              />
            </div>
            {loggingIn ? (
              <LoadingSpinner />
            ) : (
              <Button
                variant="raised"
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
