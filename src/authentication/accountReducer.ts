import { ActionType, getType } from 'typesafe-actions';
import * as account from './accountActions';

export type AccountActions = ActionType<typeof account>;
export interface State {
  loggingIn: boolean;
  sideBarOpen: boolean;
  returnUrl: string;
  token?: string;
  userId?: string;
  accountType?: 'member' | 'admin';
}
export const initialState: State = {
  loggingIn: false,
  sideBarOpen: false,
  returnUrl: '/account/profile',
};
export default (state = initialState, action: AccountActions) => {
  switch (action.type) {
    case getType(account.logIn):
      return { ...state, loggingIn: true };
    case getType(account.logInSuccess): {
      const { payload } = action;
      return { ...state, loggingIn: false, ...payload };
    }
    case getType(account.logInError):
      return { ...state, loggingIn: false };
    case getType(account.logOut):
      return initialState;
    case getType(account.toggleSideBar):
      return { ...state, sideBarOpen: !state.sideBarOpen };
    case getType(account.changeSideBarState):
      return { ...state, sideBarOpen: action.payload.open };
    case getType(account.setReturnUrl):
      return { ...state, returnUrl: action.payload.returnUrl };
    default:
      return state;
  }
};
