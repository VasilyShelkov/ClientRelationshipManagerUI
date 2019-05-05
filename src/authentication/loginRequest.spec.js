import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import loginRequest from './loginRequest';
import { logIn, logInSuccess, logInError } from './accountActions';

describe('src/authentication/loginRequest.js', () => {
  xit('logs in successfully and goes to returnUrl', async () => {
    const values = {
      email: 'testEmail@test.com',
      password: '1234',
    };
    const dispatch = jest.fn();
    const loginAccountDetails = { data: { token: 'accountDetails' } };
    const post = jest.fn().mockImplementation(() => loginAccountDetails);
    jest.spyOn(axios, 'create').mockImplementation({
      post,
      defaults: {},
    });

    const returnUrl = '/account/profile';
    await loginRequest(values, dispatch, { returnUrl });

    expect(dispatch).toHaveBeenCalledWith(logIn());
    expect(dispatch).toHaveBeenCalledWith(
      logInSuccess(loginAccountDetails.data),
    );
    expect(dispatch).toHaveBeenCalledWith(push('/account/profile'));
  });

  xit('attempts to login but service fails', async () => {
    const values = {
      email: 'testEmail@test.com',
      password: '1234',
    };
    const dispatch = jest.fn();
    const transitionAfterLogin = jest.fn();

    const loginError = { response: { data: { error: 'testError' } } };
    const post = jest.fn().mockImplementation(() => {
      throw new Error(loginError);
    });
    jest.spyOn(axios, 'create').mockImplementation({
      post,
      defaults: {},
    });

    try {
      await loginRequest(values, dispatch, { returnUrl: '/irrelevant ' });
    } catch (e) {
      expect(e).toBe(SubmissionError);
    }

    expect(dispatch).toHaveBeenCalledWith(logIn());
    expect(dispatch).toHaveBeenCalledWith(logInError());
  });
});
