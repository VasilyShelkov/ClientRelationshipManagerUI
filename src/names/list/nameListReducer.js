import { CHANGE_SHOWN_PROTECTED_LIST } from './nameListActions';

const initialState = {
  protectedListToShow: 'protected',
  editProtectedNameMeetingDialogOpen: false,
  editProtectedNameCallDialogOpen: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHOWN_PROTECTED_LIST:
      return {
        ...state,
        protectedListToShow: action.listToShow,
      };
    default:
      return state;
  }
};
