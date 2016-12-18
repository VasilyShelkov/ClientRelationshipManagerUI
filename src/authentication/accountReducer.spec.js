import accountReducer, { initialState } from './accountReducer';
import {
  logIn, logInSuccess, logOut,
  LOGGING_IN, LOGGED_IN_SUCCESSFULLY, LOG_OUT
} from './accountActions';

describe.only('src/authentication/accountReducer.js', () => {
  it(LOGGING_IN, () => {
    const stateBefore = initialState;
    const action = logIn();

    expect(accountReducer(stateBefore, action))
      .toEqual({
        ...stateBefore,
        loggingIn: true
      });
  });

  it(LOGGED_IN_SUCCESSFULLY, () => {
    const stateBefore = { ...initialState, loggingIn: true };
    const recievedPayload = {
      token: 'testToken',
      userId: '123',
      accountType: 'admin'
    };
    const action = logInSuccess(recievedPayload);

    expect(accountReducer(stateBefore, action))
      .toEqual({
        ...stateBefore,
        loggingIn: false,
        ...recievedPayload
      });
  });

  it(LOG_OUT, () => {
    const stateBefore = {
      initialState,
      loggingIn: false,
      token: 'testToken',
      userId: '123',
      accountType: 'admin'
    };
    const action = logOut();

    expect(accountReducer(stateBefore, action))
      .toEqual(initialState);
  });
});
