import _ from 'lodash';

import { APOLLO_MUTATION_INIT, APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import {
  OPEN_PROTECT_NAME_DIALOG,
  CLOSE_PROTECT_NAME_DIALOG,
  OPEN_CLIENT_NAME_DIALOG,
  CLOSE_CLIENT_NAME_DIALOG,
  OPEN_MET_WITH_PROTECTED_DIALOG,
  CLOSE_MET_WITH_PROTECTED_DIALOG,
  SELECT_NAME,
  HIDE_NAME,
  SHOW_EDIT_NAME,
  HIDE_EDIT_NAME,
  SHOW_EDIT_NAME_COMPANY,
  HIDE_EDIT_NAME_COMPANY
} from './selectedActions';

const initialState = {
  id: false,
  showingEditNameForm: false,
  showingEditNameCompanyForm: false,
  protectNameDialogOpen: false,
  makeNameClientDialogOpen: false,
  metWithProtectedDialogOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case OPEN_MET_WITH_PROTECTED_DIALOG:
      return {
        ...state,
        metWithProtectedDialogOpen: true
      };
    case CLOSE_MET_WITH_PROTECTED_DIALOG:
      return {
        ...state,
        metWithProtectedDialogOpen: false
      };
    case SELECT_NAME:
      return {
        ...state,
        id: action.nameId,
        showingEditNameForm: initialState.showingEditNameForm,
        showingEditNameCompanyForm: initialState.showingEditNameCompanyForm
      };
    case HIDE_NAME:
      return {
        ...state,
        id: initialState.id,
        showingEditNameForm: initialState.showingEditNameForm,
        showingEditNameCompanyForm: initialState.showingEditNameCompanyForm
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
    case APOLLO_MUTATION_INIT: {
      switch (action.operationName) {
        case 'ProtectName':
          return {
            ...state,
            protectNameDialogOpen: initialState.protectNameDialogOpen
          };
        case 'MetWithProtected':
          return {
            ...state,
            metWithProtectedDialogOpen: false
          };
        case 'MakeClient':
          return {
            ...state,
            makeNameClientDialogOpen: initialState.makeNameClientDialogOpen
          };
        default:
          return state;
      }
    }
    case APOLLO_MUTATION_RESULT: {
      switch (action.operationName) {
        case 'RemoveUnprotectedName':
        case 'RemoveProtectedName':
        case 'RemoveClient':
          return {
            ...state,
            id: initialState.id
          };
        case 'CreateUnprotectedName':
          if (!_.has(action, 'result.errors')) {
            return {
              ...state,
              id: action.result.data.addUnprotectedNameToUser.name.id
            };
          }

          return state;
        case 'ProtectName':
          if (!_.has(action, 'result.errors')) {
            return {
              ...state,
              id: action.result.data.protectNameToUser.name.id
            };
          }

          return state;
        case 'MetWithProtected':
          if (!_.has(action, 'result.errors')) {
            return {
              ...state,
              id: action.result.data.editProtectedName.name.id
            };
          }

          return state;
        case 'UnprotectName':
          if (!_.has(action, 'result.errors')) {
            return {
              ...state,
              id: action.result.data.unprotectNameFromUser.name.id
            };
          }

          return state;
        case 'MakeClient':
          if (!_.has(action, 'result.errors')) {
            return {
              ...state,
              id: action.result.data.addClientToUser.name.id
            };
          }

          return state;
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
