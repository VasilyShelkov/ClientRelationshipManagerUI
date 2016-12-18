import axios from 'axios';
import { SubmissionError } from 'redux-form';
import config from '../../config';
import { logInSuccess } from './accountActions';

const instance = axios.create();
instance.defaults.timeout = 5000;
instance.defaults.baseURL = config.graphQL;

export default async (values, dispatch) => {
  try {
    const accountDetails = await instance.post('/login', { email: values.email, password: values.password });
    dispatch(logInSuccess(accountDetails.data));
  } catch (e) {
    throw new SubmissionError({ _error: e.response.data.error });
  }
};
