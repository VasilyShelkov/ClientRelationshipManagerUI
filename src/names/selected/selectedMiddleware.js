import { push } from 'react-router-redux';
import { SELECT_NAME, HIDE_NAME } from './selectedActions';

export default store => next => action => {
  next(action);
  switch (action.type) {
    case SELECT_NAME:
      const { listWithSelectedName, name } = action;
      store.dispatch(
        push(
          `/account/names/${listWithSelectedName}/selected/${encodeURI(name.name.firstName.toLowerCase())}-${encodeURI(name.name.lastName.toLowerCase())}`
        )
      );
      break;
    case HIDE_NAME:
      store.dispatch(push(`/account/names/${action.listWithSelectedNameToHide}`));
      break;
  }
};
