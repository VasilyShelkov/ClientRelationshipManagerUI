import { combineReducers, compose } from 'redux';

import { mergePersistedState } from 'redux-localstorage';

import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as sweetalert } from 'react-redux-sweetalert';
import account, {
  State as AccountState,
} from './authentication/accountReducer';
import profile, { State as ProfileState } from './profile/profileReducer';
// import name from '../names/nameReducer';
// import creatingUser from '../users/creatingUserReducer';
// import selectedName from '../names/selected/selectedReducer';
// import nameList from '../names/list/nameListReducer';
// import app from './appReducer';

export interface State {
  form: any;
  routing: any;
  sweetalert: any;
  account: AccountState;
  profile: ProfileState;
}
export default compose(
  mergePersistedState((initialState: any, persistedState: any) => ({
    ...initialState,
    ...persistedState,
    account: {
      ...initialState.account,
      ...persistedState.account,
    },
    profile: {
      ...initialState.profile,
      id: persistedState.account.id,
    },
  })),
)(
  combineReducers({
    form: formReducer,
    routing: routerReducer,
    sweetalert,
    account,
    // app,
    // creatingUser,
    // name,
    profile,
    // selectedName,
    // nameList,
  }),
);
