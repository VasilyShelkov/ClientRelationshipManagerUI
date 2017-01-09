import {
  EDIT_PROFILE, EDIT_PROFILE_SUCCESS, CANCEL_EDIT_PROFILE
} from './profileActions';

export const initialState = { editing: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return { ...state, editing: true };
    case EDIT_PROFILE_SUCCESS:
    case CANCEL_EDIT_PROFILE:
      return { ...state, editing: false };
    default:
      return state;
  }
};
