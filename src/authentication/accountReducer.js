import {
  logIn, logInSuccess, logOut,
  LOGGING_IN, LOGGED_IN_SUCCESSFULLY, LOG_OUT
} from './accountActions';

export const initialState = { loggingIn: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, loggingIn: true }
    default:
      return state
  }
};
