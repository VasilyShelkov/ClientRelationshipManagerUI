import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import config from '../config';
import { logIn, logInSuccess, logInError } from './accountActions';
import { FormData, Props as LoginFormProps } from './Login';

export default async (
  values: Partial<FormData>,
  dispatch: Dispatch<any>,
  { returnUrl }: LoginFormProps,
) => {
  const instance = axios.create();
  instance.defaults.timeout = 5000;
  instance.defaults.baseURL = config.graphQL;

  dispatch(logIn());
  let accountDetails = { data: {} };
  try {
    accountDetails = await instance.post('/login', {
      email: values.email,
      password: values.password,
    });
  } catch (e) {
    dispatch(logInError());
    throw new SubmissionError({ _error: e.response.data.error });
  }

  dispatch(logInSuccess(accountDetails.data));
  dispatch(push(returnUrl));
};
