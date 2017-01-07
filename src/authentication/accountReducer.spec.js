import accountReducer, { initialState } from './accountReducer';
import {
  logIn, logInSuccess, logInError, logOut,
  LOGGING_IN, LOGGED_IN_SUCCESSFULLY, LOGGED_IN_ERROR, LOG_OUT
} from './accountActions';

describe('src/authentication/accountReducer.js', () => {
  it(LOGGING_IN, () => {
    const stateBefore = initialState;
    const action = logIn();

    expect(accountReducer(stateBefore, action)).to.deep.equal({
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

    expect(accountReducer(stateBefore, action)).to.deep.equal({
      ...stateBefore,
      loggingIn: false,
      ...recievedPayload
    });
  });

  it(LOGGED_IN_ERROR, () => {
    const stateBefore = { ...initialState, loggingIn: true };
    const action = logInError();

    expect(accountReducer(stateBefore, action)).to.deep.equal({
      ...stateBefore,
      loggingIn: false,
    });
  })

  it(LOG_OUT, () => {
    const stateBefore = {
      initialState,
      loggingIn: false,
      token: 'testToken',
      userId: '123',
      accountType: 'admin'
    };
    const action = logOut();

    expect(accountReducer(stateBefore, action)).to.deep.equal(initialState);
  });
});
