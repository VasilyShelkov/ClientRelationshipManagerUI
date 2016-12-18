import axios from 'axios';
import { SubmissionError } from 'redux-form';
import config from '../../config';
import { logIn, logInSuccess, logInError } from './accountActions';

const instance = axios.create();
instance.defaults.timeout = 5000;
instance.defaults.baseURL = config.graphQL;

export default async (values, dispatch, props) => {
  dispatch(logIn());
  try {
    const accountDetails = await instance.post('/login', { email: values.email, password: values.password });
    dispatch(logInSuccess(accountDetails.data));
    props.transitionAfterLogin();
  } catch (e) {
    dispatch(logInError());
    throw new SubmissionError({ _error: e.response.data.error });
  }
};
