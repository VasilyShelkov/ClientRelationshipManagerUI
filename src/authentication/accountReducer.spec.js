import accountReducer, { initialState } from './accountReducer';
import {
  logInSuccess,
  logOut,
  LOGGED_IN_SUCCESSFULLY,
  LOG_OUT,
} from './accountActions';

describe('src/authentication/accountReducer.js', () => {
  it(LOGGED_IN_SUCCESSFULLY, () => {
    const stateBefore = { ...initialState };
    const recievedPayload = {
      token: 'testToken',
      userId: '123',
      accountType: 'admin',
    };
    const action = logInSuccess(recievedPayload);

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      ...recievedPayload,
    });
  });

  it(LOG_OUT, () => {
    const stateBefore = {
      ...initialState,
      token: 'testToken',
      userId: '123',
      accountType: 'admin',
    };
    const action = logOut();

    expect(accountReducer(stateBefore, action)).toEqual(initialState);
  });
});
