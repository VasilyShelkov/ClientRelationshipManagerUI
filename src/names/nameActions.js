export const SELECT_UNPROTECTED = 'SELECT_UNPROTECTED';
export const selectUnprotectedName = (nameIndex) => ({
  type: SELECT_UNPROTECTED,
  nameIndex
});

export const HIDE_UNPROTECTED = 'HIDE_UNPROTECTED';
export const hideUnprotectedName = () => ({
  type: HIDE_UNPROTECTED
});

export const OPEN_PROTECT_NAME_DIALOG = 'OPEN_PROTECT_NAME_DIALOG';
export const openProtectNameDialog = () => ({
  type: OPEN_PROTECT_NAME_DIALOG
});

export const CLOSE_PROTECT_NAME_DIALOG = 'CLOSE_PROTECT_NAME_DIALOG';
export const closeProtectNameDialog = () => ({
  type: CLOSE_PROTECT_NAME_DIALOG
});

export const SHOW_CREATE_NAME_FORM = 'SHOW_CREATE_NAME_FORM';
export const showCreateNameForm = () => ({
  type: SHOW_CREATE_NAME_FORM
});

export const HIDE_CREATE_NAME_FORM = 'HIDE_CREATE_NAME_FORM';
export const hideCreateNameForm = () => ({
  type: HIDE_CREATE_NAME_FORM
});

export const SHOW_EDIT_NAME = 'SHOW_EDIT_NAME';
export const showEditName = () => ({
  type: SHOW_EDIT_NAME
});

export const HIDE_EDIT_NAME = 'HIDE_EDIT_NAME';
export const hideEditName = () => ({
  type: HIDE_EDIT_NAME
});
