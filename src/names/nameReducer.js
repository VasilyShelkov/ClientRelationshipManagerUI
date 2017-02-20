import { APOLLO_MUTATION_INIT, APOLLO_MUTATION_RESULT } from '../app/thirdPartyActions';
import {
  OPEN_NAME_DETAILS_DRAWER, CLOSE_NAME_DETAILS_DRAWER,
  OPEN_PROTECT_NAME_DIALOG, CLOSE_PROTECT_NAME_DIALOG,
  SHOW_CREATE_NAME_FORM, HIDE_CREATE_NAME_FORM
} from './nameActions';

const initialState = {
  nameDetailsToShow: false,
  protectNameDialogOpen: false,
  creating: false,
  showingCreateForm: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NAME_DETAILS_DRAWER:
      return {
        ...state,
        nameDetailsToShow: action.nameIndex
      };
    case CLOSE_NAME_DETAILS_DRAWER:
      return {
        ...state,
        nameDetailsToShow: false
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
