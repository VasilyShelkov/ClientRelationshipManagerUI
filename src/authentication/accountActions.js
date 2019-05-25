export const LOGGED_IN_SUCCESSFULLY = 'LOGGED_IN_SUCCESSFULLY';
export const logInSuccess = payload => ({
  type: LOGGED_IN_SUCCESSFULLY,
  ...payload,
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
export const changeSideBarState = open => ({
  type: CHANGE_SIDE_BAR_STATE,
  open,
});

export const SET_RETURN_URL = 'SET_RETURN_URL';
export const setReturnUrl = returnUrl => ({
  type: SET_RETURN_URL,
  returnUrl,
});
