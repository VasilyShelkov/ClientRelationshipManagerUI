import {
  LOGGED_IN_SUCCESSFULLY,
  LOG_OUT,
  TOGGLE_SIDE_BAR,
  CHANGE_SIDE_BAR_STATE,
  SET_RETURN_URL,
} from './accountActions';

export const initialState = {
  sideBarOpen: false,
  returnUrl: '/account/profile',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_SUCCESSFULLY: {
      const { type, ...payload } = action;
      return { ...state, ...payload };
    }
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
