import { EDIT_PROFILE, CANCEL_EDIT_PROFILE } from './profileActions';

export const initialState = { editing: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return { ...state, editing: true };
    case CANCEL_EDIT_PROFILE:
      return { ...state, editing: false };
    default:
      return state;
  }
};
