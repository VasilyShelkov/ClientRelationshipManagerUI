export const LOGGED_IN_SUCCESSFULLY = 'LOGGED_IN_SUCCESSFULLY';
export const logInSuccess = payload => ({
  type: LOGGED_IN_SUCCESSFULLY,
  ...payload,
});

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => ({
  type: LOG_OUT,
});

export const SET_RETURN_URL = 'SET_RETURN_URL';
export const setReturnUrl = returnUrl => ({
  type: SET_RETURN_URL,
  returnUrl,
});
