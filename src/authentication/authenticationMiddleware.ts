import { push } from 'react-router-redux';
import { Store, Dispatch } from 'redux';

import { setReturnUrl } from './accountActions';
import { State } from '../rootReducer';

export default (store: Store<State>) => (next: Dispatch<any>) => (
  action: any,
) => {
  next(action);
  if (action.type === '@@router/LOCATION_CHANGE') {
    const { pathname } = action.payload;
    if (
      pathname &&
      pathname.includes('account') &&
      !store.getState().account.token
    ) {
      store.dispatch(setReturnUrl(pathname));
      store.dispatch(push('/login'));
    }
  }
};
