import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import {
  CHANGE_SHOWN_PROTECTED_LIST,
  OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG,
  CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG,
} from './nameListActions';

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
