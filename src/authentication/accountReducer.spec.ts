import accountReducer, { initialState } from './accountReducer';
import {
  logIn,
  logInSuccess,
  logInError,
  logOut,
  toggleSideBar,
  changeSideBarState,
  LOGGING_IN,
  LOGGED_IN_SUCCESSFULLY,
  LOGGED_IN_ERROR,
  LOG_OUT,
  TOGGLE_SIDE_BAR,
  CHANGE_SIDE_BAR_STATE,
} from './accountActions';

describe('src/authentication/accountReducer.js', () => {
  test(LOGGING_IN, () => {
    const stateBefore = initialState;
    const action = logIn();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      loggingIn: true,
    });
  });

  test(LOGGED_IN_SUCCESSFULLY, () => {
    const stateBefore = { ...initialState, loggingIn: true };
    const recievedPayload = {
      token: 'testToken',
      userId: '123',
      accountType: 'admin' as 'admin',
    };
    const action = logInSuccess(recievedPayload);

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      loggingIn: false,
      ...recievedPayload,
    });
  });

  test(LOGGED_IN_ERROR, () => {
    const stateBefore = { ...initialState, loggingIn: true };
    const action = logInError();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      loggingIn: false,
    });
  });

  test(LOG_OUT, () => {
    const stateBefore = {
      ...initialState,
      loggingIn: false,
      token: 'testToken',
      userId: '123',
      accountType: 'admin' as 'admin',
    };
    const action = logOut();

    expect(accountReducer(stateBefore, action)).toEqual(initialState);
  });

  test(`${TOGGLE_SIDE_BAR} opens the side nav`, () => {
    const stateBefore = initialState;
    const action = toggleSideBar();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      sideBarOpen: true,
    });
  });

  test(`${TOGGLE_SIDE_BAR} closes the side nav`, () => {
    const stateBefore = {
      ...initialState,
      sideBarOpen: true,
    };
    const action = toggleSideBar();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      sideBarOpen: false,
    });
  });

  test(`${TOGGLE_SIDE_BAR} closes the side nav`, () => {
    const stateBefore = {
      ...initialState,
      sideBarOpen: true,
    };
    const action = toggleSideBar();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      sideBarOpen: false,
    });
  });

  test(CHANGE_SIDE_BAR_STATE, () => {
    const stateBefore = {
      ...initialState,
      sideBarOpen: true,
    };
    const newSideBarState = false;
    const action = changeSideBarState(newSideBarState);

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      sideBarOpen: newSideBarState,
    });
  });
});
