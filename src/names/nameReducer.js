import { APOLLO_MUTATION_INIT, APOLLO_MUTATION_RESULT } from '../app/thirdPartyActions';
import {
  SELECT_UNPROTECTED, HIDE_UNPROTECTED,
  SELECT_PROTECTED, HIDE_PROTECTED,
  OPEN_PROTECT_NAME_DIALOG, CLOSE_PROTECT_NAME_DIALOG,
  SHOW_CREATE_NAME_FORM, HIDE_CREATE_NAME_FORM,
  SHOW_EDIT_NAME, HIDE_EDIT_NAME
} from './nameActions';

const initialState = {
  selectedUnprotected: false,
  selectedProtected: false,
  selectedClient: false,
  protectNameDialogOpen: false,
  creating: false,
  showingCreateForm: false,
  showingEditNameForm: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_UNPROTECTED:
      return {
        ...state,
        selectedUnprotected: action.nameIndex
      };
    case HIDE_UNPROTECTED:
      return {
        ...state,
        selectedUnprotected: initialState.selectedUnprotected
      };
    case SELECT_PROTECTED:
      return {
        ...state,
        selectedProtected: action.nameIndex
      };
    case HIDE_PROTECTED:
      return {
        ...state,
        selectedProtected: initialState.selectedProtected
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
    case APOLLO_MUTATION_INIT: {
      if (action.operationName === 'CreateUnprotectedName') {
        return {
          ...state,
          creating: true
        };
      }

      return state;
    }
    case APOLLO_MUTATION_RESULT: {
      if (action.operationName === 'CreateUnprotectedName') {
        return {
          ...state,
          creating: false
        };
      }

      return state;
    }
    default:
      return state;
  }
};
