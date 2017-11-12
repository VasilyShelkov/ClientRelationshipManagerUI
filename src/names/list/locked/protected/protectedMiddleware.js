import { CHANGE_SHOWN_PROTECTED_LIST } from '../../nameListActions';

export default store => next => action => {
  next(action);
  if (
    action.type === '@@router/LOCATION_CHANGE' &&
    action.payload.pathname.includes('metWithProtected')
  ) {
    store.dispatch({
      type: CHANGE_SHOWN_PROTECTED_LIST,
      listToShow: 'metWithProtected',
    });
  }
};
