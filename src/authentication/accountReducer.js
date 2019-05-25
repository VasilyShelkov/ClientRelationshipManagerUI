import {
  LOGGED_IN_SUCCESSFULLY,
  LOG_OUT,
  TOGGLE_SIDE_BAR,
  CHANGE_SIDE_BAR_STATE,
  SET_RETURN_URL,
} from './accountActions';
import produce from 'immer';

export const initialState = {
  sideBarOpen: false,
  returnUrl: '/account/profile',
};
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGGED_IN_SUCCESSFULLY: {
        const { type, ...payload } = action;
        return { ...draft, ...payload };
      }
      case LOG_OUT:
        return initialState;
      case TOGGLE_SIDE_BAR:
        draft.sideBarOpen = !state.sideBarOpen;
        break;
      case CHANGE_SIDE_BAR_STATE:
        draft.sideBarOpen = action.open;
        break;
      case SET_RETURN_URL:
        draft.returnUrl = action.returnUrl;
        break;
      default:
        return state;
    }
  });
