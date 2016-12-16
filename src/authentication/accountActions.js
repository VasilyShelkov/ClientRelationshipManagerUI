export const LOGGING_IN = 'LOGGING_IN';
export const logIn = () => ({
  type: LOGGING_IN
});

export const LOGGED_IN_SUCCESSFULLY = 'LOGGED_IN_SUCCESSFULLY';
export const logInSuccess = payload => ({
  type: LOGGED_IN_SUCCESSFULLY,
  ...payload
});

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => ({
  type: LOG_OUT
});
