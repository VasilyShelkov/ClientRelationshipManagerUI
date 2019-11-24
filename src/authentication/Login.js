import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { push } from 'react-router-redux';

import { Box, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ButtonWithLoadingIndicator from '../shared/ButtonWithLoadingIndicator';
import { FormErrorNotification } from '../shared/FormElements';
import { FormikTextField } from '../shared/FormikFormElements';
import handleSignIn from './loginRequest';
import { logInSuccess as logInSuccessAction } from './accountActions';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('required')
    .email('must be a valid email'),
  password: Yup.string().required('required'),
});

const useStyles = makeStyles({
  form: {
    width: 300,
    textAlign: 'center',
    padding: 15,
  },
});

export const Login = ({ goToUrl, returnUrl, logInSuccess }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        textAlign="center"
        fontSize="h3.fontSize"
        fontWeight="fontWeightMedium"
        flexDirection="column"
        alignItems="center"
      >
        <img
          src="https://regency-wealth.com/wp-content/uploads/2018/05/regency-1.png"
          alt="regency-wealth-company-logo"
          height="100"
        />
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <Paper className={classes.form}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              handleSignIn(values, {
                stopSubmitting: () => setSubmitting(false),
                goToReturnUrl: () => goToUrl(returnUrl),
                logInSuccess,
                setLoginError: () => setStatus('Email or password are invalid'),
              });
            }}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <FormErrorNotification message={status} zDepth={2} />

                <Field
                  type="email"
                  name="email"
                  label="Enter your email"
                  component={FormikTextField}
                />

                <Field
                  type="password"
                  name="password"
                  label="Enter your password"
                  component={FormikTextField}
                />

                <Box mt={1}>
                  <ButtonWithLoadingIndicator
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                  >
                    Log in
                  </ButtonWithLoadingIndicator>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

const mapStateToProps = state => ({
  returnUrl: state.account.returnUrl,
});

const mapDispatchToProps = dispatch => ({
  goToUrl: url => dispatch(push(url)),
  logInSuccess: data => dispatch(logInSuccessAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
