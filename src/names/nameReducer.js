import { actionTypes } from 'redux-form';
import {
  APOLLO_MUTATION_INIT,
  APOLLO_MUTATION_RESULT,
} from '../app/thirdPartyActions';
import { SHOW_NOTIFICATION } from '../app/appActions';
import {
  OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG,
  CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG,
  PERFORMING_NAME_ACTION,
} from './nameActions';
import { SELECT_NAME } from './selected/selectedActions';

const initialState = {
  editProtectedNameMeetingDialogOpen: false,
  editProtectedNameCallDialogOpen: false,
  actionInProgress: false,
  initialListIndex: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NAME:
      return {
        ...state,
        initialListIndex: action.namePosition - 1
      }
    case actionTypes.STOP_SUBMIT:
    case SHOW_NOTIFICATION:
      return {
        ...state,
        actionInProgress: initialState.actionInProgress,
      };
    case OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG:
      return {
        ...state,
        editProtectedNameMeetingDialogOpen: action.nameId,
      };
    case OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG:
      return {
        ...state,
        editProtectedNameCallDialogOpen: action.nameId,
      };
    case CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG:
      return {
        ...state,
        editProtectedNameMeetingDialogOpen: false,
      };
    case CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG:
      return {
        ...state,
        editProtectedNameCallDialogOpen: false,
      };
    case PERFORMING_NAME_ACTION:
      return {
        ...state,
        actionInProgress: action.payload.message,
      };
    case APOLLO_MUTATION_INIT: {
      switch (action.operationName) {
        case 'CreateUnprotectedName':
          return {
            ...state,
            actionInProgress: `Creating ${action.variables.firstName} ${
              action.variables.lastName
            } for you...`,
          };
        case 'EditName':
          return {
            ...state,
            actionInProgress: `Editing ${action.variables.firstName} ${
              action.variables.lastName
            } for you...`,
          };
        case 'EditCompany':
          return {
            ...state,
            actionInProgress: `Editing ${action.variables.name} for you...`,
          };
        case 'BookCall':
        case 'BookClientCall':
          return {
            ...state,
            editProtectedNameCallDialogOpen:
              initialState.editProtectedNameCallDialogOpen,
          };
        case 'BookMeeting':
        case 'BookClientMeeting':
          return {
            ...state,
            editProtectedNameMeetingDialogOpen:
              initialState.editProtectedNameMeetingDialogOpen,
          };
        default:
          return state;
      }
    }
    case APOLLO_MUTATION_RESULT: {
      switch (action.operationName) {
        case 'UnprotectName':
        case 'RemoveUnprotectedName':
        case 'RemoveProtectedName':
        case 'MakeClient':
        case 'RemoveClient':
        case 'EditName':
        case 'EditCompany':
        case 'BookCall':
        case 'BookMeeting':
        case 'BookClientCall':
        case 'BookClientMeeting':
        case 'CreateUnprotectedname':
        case 'ProtectName':
        case 'MetWithProtected':
          return {
            ...state,
            actionInProgress: initialState.actionInProgress,
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
