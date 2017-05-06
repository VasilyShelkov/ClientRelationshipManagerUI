export const CHANGE_SHOWN_PROTECTED_LIST = 'CHANGE_SHOWN_PROTECTED_LIST';
export const changeShownProtectedList = listToShow => ({
  type: CHANGE_SHOWN_PROTECTED_LIST,
  listToShow
});

export const SHOW_CREATE_NAME_FORM = 'SHOW_CREATE_NAME_FORM';
export const showCreateNameForm = () => ({
  type: SHOW_CREATE_NAME_FORM
});

export const HIDE_CREATE_NAME_FORM = 'HIDE_CREATE_NAME_FORM';
export const hideCreateNameForm = () => ({
  type: HIDE_CREATE_NAME_FORM
});
