import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import {
  CHANGE_SHOWN_PROTECTED_LIST,
  OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG,
  CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG,
  SHOW_CREATE_NAME_FORM,
  HIDE_CREATE_NAME_FORM
} from './nameListActions';

const initialState = {
  protectedListToShow: 'protected',
  editProtectedNameMeetingDialogOpen: false,
  editProtectedNameCallDialogOpen: false,
  showingCreateForm: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHOWN_PROTECTED_LIST:
      return {
        ...state,
        protectedListToShow: action.listToShow
      };
    case SHOW_CREATE_NAME_FORM:
      return {
        ...state,
        showingCreateForm: true
      };
    case HIDE_CREATE_NAME_FORM:
      return {
        ...state,
        showingCreateForm: false
      };
    case APOLLO_MUTATION_RESULT: {
      switch (action.operationName) {
        case 'CreateUnprotectedName':
          return {
            ...state,
            showingCreateForm: false
          };
        case 'ProtectName':
          return {
            ...state,
            protectedListToShow: initialState.protectedListToShow,
            actionInProgress: initialState.actionInProgress
          };
        case 'MetWithProtected':
          return {
            ...state,
            protectedListToShow: 'metWithProtected'
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
