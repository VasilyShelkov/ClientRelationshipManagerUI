import {
  LOGGED_IN_SUCCESSFULLY,
  LOG_OUT,
  SET_RETURN_URL,
} from './accountActions';
import produce from 'immer';

export const initialState = {
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
      case SET_RETURN_URL:
        draft.returnUrl = action.returnUrl;
        break;
      default:
        return state;
    }
  });
