import { createAction } from 'typesafe-actions';

export const LOGGING_IN = 'LOGGING_IN';
export const logIn = createAction(LOGGING_IN, resolve => () => ({
  type: LOGGING_IN,
}));

interface Payload {
  token: string;
  userId: string;
  accountType: 'member' | 'admin';
}
export const LOGGED_IN_SUCCESSFULLY = 'LOGGED_IN_SUCCESSFULLY';
export const logInSuccess = createAction(
  LOGGED_IN_SUCCESSFULLY,
  resolve => (payload: Payload) => ({
    type: LOGGED_IN_SUCCESSFULLY,
    payload,
  }),
);

export const LOGGED_IN_ERROR = 'LOGGED_IN_ERROR';
export const logInError = createAction(LOGGED_IN_ERROR, resolve => () => ({
  type: LOGGED_IN_ERROR,
}));

export const LOG_OUT = 'LOG_OUT';
export const logOut = createAction(LOG_OUT, resolve => () => ({
  type: LOG_OUT,
}));

export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR';
export const toggleSideBar = createAction(TOGGLE_SIDE_BAR, resolve => () => ({
  type: TOGGLE_SIDE_BAR,
}));

export const CHANGE_SIDE_BAR_STATE = 'CHANGE_SIDE_BAR_STATE';
export const changeSideBarState = createAction(
  CHANGE_SIDE_BAR_STATE,
  resolve => (open: boolean) => ({
    type: CHANGE_SIDE_BAR_STATE,
    payload: { open },
  }),
);

export const SET_RETURN_URL = 'SET_RETURN_URL';
export const setReturnUrl = createAction(
  SET_RETURN_URL,
  resolve => (returnUrl: string) => ({
    type: SET_RETURN_URL,
    payload: { returnUrl },
  }),
);
