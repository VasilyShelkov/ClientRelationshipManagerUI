import {
  LOGGING_IN,
  LOGGED_IN_SUCCESSFULLY,
  LOGGED_IN_ERROR,
  LOG_OUT,
  TOGGLE_SIDE_BAR,
  CHANGE_SIDE_BAR_STATE,
  SET_RETURN_URL,
} from './accountActions';

export interface State {
  loggingIn: boolean;
  sideBarOpen: boolean;
  returnUrl: string;
  token?: string;
  userId?: string;
  accountType?: 'member' | 'admin';
}
export const initialState: State = {
  loggingIn: false,
  sideBarOpen: false,
  returnUrl: '/account/profile',
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, loggingIn: true };
    case LOGGED_IN_SUCCESSFULLY: {
      const { type, ...payload } = action;
      return { ...state, loggingIn: false, ...payload };
    }
    case LOGGED_IN_ERROR:
      return { ...state, loggingIn: false };
    case LOG_OUT:
      return initialState;
    case TOGGLE_SIDE_BAR:
      return { ...state, sideBarOpen: !state.sideBarOpen };
    case CHANGE_SIDE_BAR_STATE:
      return { ...state, sideBarOpen: action.open };
    case SET_RETURN_URL:
      return { ...state, returnUrl: action.returnUrl };
    default:
      return state;
  }
};
