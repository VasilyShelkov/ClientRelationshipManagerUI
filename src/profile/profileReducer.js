import { APOLLO_MUTATION_RESULT } from '../app/actions';
import {
  EDIT_PROFILE_PASSWORD, CANCEL_EDIT_PROFILE_PASSWORD,
  EDIT_PROFILE, CANCEL_EDIT_PROFILE,
  EDIT_COMPANY, CANCEL_EDIT_COMPANY,
  REMOVE_PROFILE_NOTIFICATION
} from './profileActions';

export const initialState = {
  editing: { profile: false, password: false, company: false },
  notification: { company: '', profile: '' }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
        editing: { ...state.editing, profile: true }
      };
    case EDIT_PROFILE_PASSWORD:
      return {
        ...state,
        editing: { ...state.editing, password: true }
      };
    case EDIT_COMPANY:
      return {
        ...state,
        editing: { ...state.editing, company: true }
      };
    case CANCEL_EDIT_PROFILE:
      return {
        ...state,
        editing: { ...state.editing, profile: false }
      };
    case CANCEL_EDIT_PROFILE_PASSWORD:
      return {
        ...state,
        editing: { ...state.editing, password: false }
      };
    case CANCEL_EDIT_COMPANY:
      return {
        ...state,
        editing: { ...state.editing, company: false }
      };
    case REMOVE_PROFILE_NOTIFICATION:
      return {
        ...state,
        notification: initialState.notification
      };
    case APOLLO_MUTATION_RESULT:
      if (action.result.data && !action.result.errors) {
        switch (action.operationName) {
          case 'EditUserDetails':
            return {
              ...state,
              editing: { ...state.editing, profile: false },
              notification: { profile: 'Successfully updated', company: '' }
            };
          case 'EditUserPassword':
            return {
              ...state,
              editing: { ...state.editing, password: false },
              notification: { profile: 'Successfully updated password', company: '' }
            };
          case 'EditCompanyDetails':
            return {
              ...state,
              editing: { ...state.editing, company: false },
              notification: { company: 'Successfully updated', profile: '' }
            };
          default:
            return state;
        }
      }
      return state;
    default:
      return state;
  }
};
