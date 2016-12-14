import axios from 'axios';
import { SubmissionError } from 'redux-form';
import config from '../../config';

const instance = axios.create();
instance.defaults.timeout = 5000;
instance.defaults.baseURL = config.graphQL;

export default async (values) => {
  try {
    await instance.post('/login', { email: values.email, password: values.password });
  } catch (e) {
    throw new SubmissionError({ _error: e.response.data.error });
  }
};
