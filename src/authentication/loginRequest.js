import axios from 'axios';
import config from '../config';

export default async (
  values,
  { stopSubmitting, goToReturnUrl, logInSuccess, setLoginError },
) => {
  const instance = axios.create();
  instance.defaults.timeout = 5000;
  instance.defaults.baseURL = config.graphQL;

  let accountDetails = null;
  try {
    accountDetails = await instance.post('/login', {
      email: values.email,
      password: values.password,
    });
  } catch (e) {
    setLoginError();
  }

  stopSubmitting();

  if (accountDetails) {
    logInSuccess(accountDetails.data);
    goToReturnUrl();
  }
};
