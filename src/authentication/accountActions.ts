export const LOGGING_IN = 'LOGGING_IN';
export const logIn = () => ({
  type: LOGGING_IN,
});

interface Payload {
  token: string;
  userId: string;
  accountType: 'member' | 'admin';
}
export const LOGGED_IN_SUCCESSFULLY = 'LOGGED_IN_SUCCESSFULLY';
export const logInSuccess = (payload: Payload | {}) => ({
  type: LOGGED_IN_SUCCESSFULLY,
  ...payload,
});

export const LOGGED_IN_ERROR = 'LOGGED_IN_ERROR';
export const logInError = () => ({
  type: LOGGED_IN_ERROR,
});

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => ({
  type: LOG_OUT,
});

export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR';
export const toggleSideBar = () => ({
  type: TOGGLE_SIDE_BAR,
});

export const CHANGE_SIDE_BAR_STATE = 'CHANGE_SIDE_BAR_STATE';
export const changeSideBarState = (open: boolean) => ({
  type: CHANGE_SIDE_BAR_STATE,
  open,
});

export const SET_RETURN_URL = 'SET_RETURN_URL';
export const setReturnUrl = (returnUrl: string) => ({
  type: SET_RETURN_URL,
  returnUrl,
});
