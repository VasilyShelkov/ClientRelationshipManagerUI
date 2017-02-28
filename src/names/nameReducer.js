import _ from 'lodash';
import { APOLLO_MUTATION_INIT, APOLLO_MUTATION_RESULT } from '../app/thirdPartyActions';
import { SHOW_NOTIFICATION } from '../app/appActions';
import {
  SELECT_NAME, HIDE_NAME,
  OPEN_PROTECT_NAME_DIALOG, CLOSE_PROTECT_NAME_DIALOG,
  OPEN_CLIENT_NAME_DIALOG, CLOSE_CLIENT_NAME_DIALOG,
  OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG, CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG, CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG,
  SHOW_CREATE_NAME_FORM, HIDE_CREATE_NAME_FORM,
  SHOW_EDIT_NAME, HIDE_EDIT_NAME,
  SHOW_EDIT_NAME_COMPANY, HIDE_EDIT_NAME_COMPANY,
  PERFORMING_NAME_ACTION
} from './nameActions';

const initialState = {
  selectedName: false,
  protectNameDialogOpen: false,
  makeNameClientDialogOpen: false,
  editProtectedNameMeetingDialogOpen: false,
  editProtectedNameCallDialogOpen: false,
  showingCreateForm: false,
  showingEditNameForm: false,
  showingEditNameCompanyForm: false,
  actionInProgress: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        actionInProgress: initialState.actionInProgress
      };
    case SELECT_NAME:
      return {
        ...state,
        selectedName: action.nameId,
        showingEditNameForm: initialState.showingEditNameForm,
        showingEditNameCompanyForm: initialState.showingEditNameCompanyForm
      };
    case HIDE_NAME:
      return {
        ...state,
        selectedName: initialState.selectedName,
        showingEditNameForm: initialState.showingEditNameForm,
        showingEditNameCompanyForm: initialState.showingEditNameCompanyForm
      };
    case OPEN_PROTECT_NAME_DIALOG:
      return {
        ...state,
        protectNameDialogOpen: true
      };
    case CLOSE_PROTECT_NAME_DIALOG:
      return {
        ...state,
        protectNameDialogOpen: false
      };
    case OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG:
      return {
        ...state,
        editProtectedNameMeetingDialogOpen: action.nameId
      };
    case OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG:
      return {
        ...state,
        editProtectedNameCallDialogOpen: action.nameId
      };
    case CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG:
      return {
        ...state,
        editProtectedNameMeetingDialogOpen: false
      };
    case CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG:
      return {
        ...state,
        editProtectedNameCallDialogOpen: false
      };
    case OPEN_CLIENT_NAME_DIALOG:
      return {
        ...state,
        makeNameClientDialogOpen: true
      };
    case CLOSE_CLIENT_NAME_DIALOG:
      return {
        ...state,
        makeNameClientDialogOpen: false
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
    case SHOW_EDIT_NAME:
      return {
        ...state,
        showingEditNameForm: true
      };
    case HIDE_EDIT_NAME:
      return {
        ...state,
        showingEditNameForm: false
      };
    case SHOW_EDIT_NAME_COMPANY:
      return {
        ...state,
        showingEditNameCompanyForm: true
      };
    case HIDE_EDIT_NAME_COMPANY:
      return {
        ...state,
        showingEditNameCompanyForm: false
      };
    case PERFORMING_NAME_ACTION:
      return {
        ...state,
        actionInProgress: action.payload.message
      };
    case APOLLO_MUTATION_INIT: {
      if (action.operationName === 'CreateUnprotectedName') {
        return {
          ...state,
          actionInProgress: `Creating ${action.variables.firstName} ${action.variables.lastName} for you...`
        };
      }

      if (action.operationName === 'EditName') {
        return {
          ...state,
          actionInProgress: `Editing ${action.variables.firstName} ${action.variables.lastName} for you...`
        };
      }

      if (action.operationName === 'EditCompany') {
        return {
          ...state,
          actionInProgress: `Editing ${action.variables.name} for you...`
        };
      }

      if (action.operationName === 'ProtectName') {
        return {
          ...state,
          protectNameDialogOpen: initialState.protectNameDialogOpen,
        };
      }

      if (action.operationName === 'MakeClient') {
        return {
          ...state,
          makeNameClientDialogOpen: initialState.makeNameClientDialogOpen,
        };
      }

      if (action.operationName === 'BookCall' || action.operationName === 'BookClientCall') {
        return {
          ...state,
          editProtectedNameCallDialogOpen: initialState.editProtectedNameCallDialogOpen
        };
      }

      if (action.operationName === 'BookMeeting' || action.operationName === 'BookClientMeeting') {
        return {
          ...state,
          editProtectedNameMeetingDialogOpen: initialState.editProtectedNameMeetingDialogOpen
        };
      }

      return state;
    }
    case APOLLO_MUTATION_RESULT: {
      if (
        action.operationName === 'EditName' || action.operationName === 'EditCompany' ||
        action.operationName === 'BookCall' || action.operationName === 'BookMeeting' ||
        action.operationName === 'BookClientCall' || action.operationName === 'BookClientMeeting'
      ) {
        return {
          ...state,
          actionInProgress: initialState.actionInProgress
        };
      }

      if (action.operationName === 'CreateUnprotectedName') {
        const standardState = {
          ...state,
          showingCreateForm: false,
          actionInProgress: initialState.actionInProgress,
        };

        if (!_.has(action, 'result.errors')) {
          return {
            ...standardState,
            selectedName: action.result.data.addUnprotectedNameToUser.name.id
          };
        }

        return standardState;
      }

      if (action.operationName === 'RemoveUnprotectedName') {
        return {
          ...state,
          actionInProgress: initialState.actionInProgress,
          selectedName: initialState.selectedName
        };
      }

      if (action.operationName === 'ProtectName') {
        const standardState = {
          ...state,
          actionInProgress: initialState.actionInProgress
        };

        if (!_.has(action, 'result.errors')) {
          return {
            ...standardState,
            selectedName: action.result.data.protectNameToUser.name.id,
          };
        }

        return standardState;
      }

      if (action.operationName === 'MakeClient') {
        const standardState = {
          ...state,
          actionInProgress: initialState.actionInProgress
        };

        if (!_.has(action, 'result.errors')) {
          return {
            ...standardState,
            selectedName: action.result.data.addClientToUser.name.id
          };
        }

        return standardState;
      }

      if (action.operationName === 'RemoveProtectedName') {
        return {
          ...state,
          actionInProgress: initialState.actionInProgress,
          selectedName: initialState.selectedName
        };
      }

      if (action.operationName === 'RemoveClient') {
        return {
          ...state,
          actionInProgress: initialState.actionInProgress,
          selectedName: initialState.selectedName
        };
      }

      return state;
    }
    default:
      return state;
  }
};
