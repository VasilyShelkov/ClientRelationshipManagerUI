import {
  LOGGING_IN, LOGGED_IN_SUCCESSFULLY, LOG_OUT
} from './accountActions';

export const initialState = { loggingIn: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, loggingIn: true };
    case LOGGED_IN_SUCCESSFULLY: {
      const { type, ...payload } = action;
      return { ...state, loggingIn: false, ...payload };
    }
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
