import { ActionType, getType } from 'typesafe-actions';
import * as account from '../authentication/accountActions';
import * as profile from './profileActions';

export type ProfileActions = ActionType<
  typeof profile | typeof account.logInSuccess
>;
export const EDIT_IN_PROGRESS = 'EDIT_IN_PROGRESS';
export interface State {
  userId: string;
  display: { company: boolean };
  editing: { profile: boolean; password: boolean; company: boolean };
  notification: { company: string; profile: string; newUser: string };
}
export const initialState = {
  userId: '',
  display: { company: true },
  editing: { profile: false, password: false, company: false },
  notification: { company: '', profile: '', newUser: '' },
};
export default (state: State = initialState, action: ProfileActions) => {
  switch (action.type) {
    case getType(profile.changeShownUserProfile):
      return {
        ...initialState,
        userId: action.payload.userIdToShow,
        display: {
          company: action.payload.currentUserId === action.payload.userIdToShow,
        },
        notification: {
          ...initialState.notification,
          newUser: action.payload.isNewUser
            ? 'Successfully created new user'
            : '',
        },
      };
    case getType(account.logInSuccess):
      return {
        ...initialState,
        userId: action.payload.userId,
      };
    case getType(profile.editProfile):
      return {
        ...state,
        editing: { ...state.editing, profile: true },
      };
    case getType(profile.editProfilePassword):
      return {
        ...state,
        editing: { ...state.editing, password: true },
      };
    case getType(profile.editCompany):
      return {
        ...state,
        editing: { ...state.editing, company: true },
      };
    case getType(profile.cancelEditProfile):
      return {
        ...state,
        editing: { ...state.editing, profile: false },
      };
    case getType(profile.cancelEditProfilePassword):
      return {
        ...state,
        editing: { ...state.editing, password: false },
      };
    case getType(profile.cancelEditCompany):
      return {
        ...state,
        editing: { ...state.editing, company: false },
      };
    case getType(profile.removeProfileNotification):
      return {
        ...state,
        notification: initialState.notification,
      };
    // case APOLLO_MUTATION_INIT:
    //   switch (action.operationName) {
    //     case 'EditUserDetails':
    //       return {
    //         ...state,
    //         editing: { ...state.editing, profile: EDIT_IN_PROGRESS },
    //       };
    //     case 'EditUserPassword':
    //       return {
    //         ...state,
    //         editing: { ...state.editing, password: EDIT_IN_PROGRESS },
    //       };
    //     case 'EditCompanyDetails':
    //       return {
    //         ...state,
    //         editing: { ...state.editing, company: EDIT_IN_PROGRESS },
    //       };
    //     default:
    //       return state;
    //   }
    // case APOLLO_MUTATION_RESULT:
    //   if (action.result.data && !action.result.errors) {
    //     switch (action.operationName) {
    //       case 'EditUserDetails':
    //         return {
    //           ...state,
    //           editing: { ...state.editing, profile: false },
    //           notification: { profile: 'Successfully updated', company: '' },
    //         };
    //       case 'EditUserPassword':
    //         return {
    //           ...state,
    //           editing: { ...state.editing, password: false },
    //           notification: {
    //             profile: 'Successfully updated password',
    //             company: '',
    //           },
    //         };
    //       case 'EditCompanyDetails':
    //         return {
    //           ...state,
    //           editing: { ...state.editing, company: false },
    //           notification: { company: 'Successfully updated', profile: '' },
    //         };
    //       default:
    //         return state;
    //     }
    //   }
    //   return state;
    default:
      return state;
  }
};
