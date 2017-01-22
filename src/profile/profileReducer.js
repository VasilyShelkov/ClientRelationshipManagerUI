import {
  EDIT_PROFILE_PASSWORD, EDIT_PROFILE_PASSWORD_SUCCESS, CANCEL_EDIT_PROFILE_PASSWORD,
  EDIT_PROFILE, EDIT_PROFILE_SUCCESS, CANCEL_EDIT_PROFILE,
  EDIT_COMPANY, EDIT_COMPANY_SUCCESS, CANCEL_EDIT_COMPANY
} from './profileActions';

export const initialState = {
  editingProfile: false, editingPassword: false, editingCompany: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_PASSWORD:
      return { ...state, editingPassword: true };
    case EDIT_PROFILE:
      return { ...state, editingProfile: true };
    case EDIT_COMPANY:
      return { ...state, editingCompany: true };
    case EDIT_PROFILE_PASSWORD_SUCCESS:
    case CANCEL_EDIT_PROFILE_PASSWORD:
      return { ...state, editingPassword: false };
    case EDIT_PROFILE_SUCCESS:
    case CANCEL_EDIT_PROFILE:
      return { ...state, editingProfile: false };
    case EDIT_COMPANY_SUCCESS:
    case CANCEL_EDIT_COMPANY:
      return { ...state, editingCompany: false };
    default:
      return state;
  }
};
