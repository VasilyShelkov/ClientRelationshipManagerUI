import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

import { logIn, logInSuccess, logInError } from './accountActions';

describe('src/authentication/loginRequest.js', () => {
  beforeEach(() => jest.resetModules());

  it('logs in successfully and goes to returnUrl', async function() {
    const values = {
      email: 'testEmail@test.com',
      password: '1234',
    };
    const dispatch = jest.fn();
    const returnUrl = '/account/profile';

    jest.mock('axios', () => ({
      create: () => ({
        defaults: {},
        post: jest.fn((url: string, body: any) => ({
          data: { token: 'accountDetails' },
        })),
      }),
    }));
    const loginRequest = require('./loginRequest').default;

    await loginRequest(values, dispatch, { returnUrl, loggingIn: true });

    expect(dispatch).toHaveBeenCalledWith(logIn());
    expect(dispatch).toHaveBeenCalledWith(
      logInSuccess({ token: 'accountDetails' }),
    );
    expect(dispatch).toHaveBeenCalledWith(push('/account/profile'));
  });

  it('attempts to login but service fails', async function() {
    const values = {
      email: 'testEmail@test.com',
      password: '1234',
    };
    const dispatch = jest.fn();

    jest.mock('axios', () => ({
      create: () => ({
        defaults: {},
        post: jest.fn((url: string, body: any) => {
          const error = new Error('axios error');
          /* tslint:disable-next-line:no-string-literal */
          error['response'] = { data: { error: 'testError' } };
          throw error;
        }),
      }),
    }));
    const loginRequest = require('./loginRequest').default;

    try {
      await loginRequest(values, dispatch, { returnUrl: '', loggingIn: true });
    } catch (e) {
      expect(e).toEqual(new SubmissionError());
    }
    expect(dispatch).toHaveBeenCalledWith(logIn());
    expect(dispatch).toHaveBeenCalledWith(logInError());
  });
});
