import accountReducer, { initialState } from './accountReducer';
import {
  logInSuccess,
  logOut,
  toggleSideBar,
  changeSideBarState,
  LOGGED_IN_SUCCESSFULLY,
  LOG_OUT,
  TOGGLE_SIDE_BAR,
  CHANGE_SIDE_BAR_STATE,
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

  it(`${TOGGLE_SIDE_BAR} opens the side nav`, () => {
    const stateBefore = initialState;
    const action = toggleSideBar();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      sideBarOpen: true,
    });
  });

  it(`${TOGGLE_SIDE_BAR} closes the side nav`, () => {
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

  it(`${TOGGLE_SIDE_BAR} closes the side nav`, () => {
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

  it(CHANGE_SIDE_BAR_STATE, () => {
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
