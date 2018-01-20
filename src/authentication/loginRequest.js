import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import config from '../../config';
import { logIn, logInSuccess, logInError } from './accountActions';

export default async (values, dispatch, { returnUrl }) => {
  const instance = axios.create();
  instance.defaults.timeout = 5000;
  instance.defaults.baseURL = config.graphQL;

  dispatch(logIn());
  let accountDetails = null;
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
