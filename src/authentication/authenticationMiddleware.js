import { push } from 'react-router-redux';
import { setReturnUrl } from './accountActions';

export default store => next => action => {
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
