export const SELECT_UNPROTECTED = 'SELECT_UNPROTECTED';
export const selectUnprotectedName = (nameIndex) => ({
  type: SELECT_UNPROTECTED,
  nameIndex
});

export const HIDE_UNPROTECTED = 'HIDE_UNPROTECTED';
export const hideUnprotectedName = () => ({
  type: HIDE_UNPROTECTED
});

export const SELECT_PROTECTED = 'SELECT_PROTECTED';
export const selectProtectedName = (nameIndex) => ({
  type: SELECT_PROTECTED,
  nameIndex
});

export const HIDE_PROTECTED = 'HIDE_PROTECTED';
export const hideProtectedName = () => ({
  type: HIDE_PROTECTED
});

export const OPEN_PROTECT_NAME_DIALOG = 'OPEN_PROTECT_NAME_DIALOG';
export const openProtectNameDialog = () => ({
  type: OPEN_PROTECT_NAME_DIALOG
});

export const CLOSE_PROTECT_NAME_DIALOG = 'CLOSE_PROTECT_NAME_DIALOG';
export const closeProtectNameDialog = () => ({
  type: CLOSE_PROTECT_NAME_DIALOG
});

export const OPEN_CLIENT_NAME_DIALOG = 'OPEN_CLIENT_NAME_DIALOG';
export const openClientNameDialog = () => ({
  type: OPEN_CLIENT_NAME_DIALOG
});

export const CLOSE_CLIENT_NAME_DIALOG = 'CLOSE_CLIENT_NAME_DIALOG';
export const closeClientNameDialog = () => ({
  type: CLOSE_CLIENT_NAME_DIALOG
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

export const SHOW_EDIT_NAME_COMPANY = 'SHOW_EDIT_NAME_COMPANY';
export const showEditNameCompany = () => ({
  type: SHOW_EDIT_NAME_COMPANY
});

export const HIDE_EDIT_NAME_COMPANY = 'HIDE_EDIT_NAME_COMPANY';
export const hideEditNameCompany = () => ({
  type: HIDE_EDIT_NAME_COMPANY
});

export const PERFORMING_NAME_ACTION = 'PERFORMING_NAME_ACTION';
export const performingNameAction = message => ({
  type: PERFORMING_NAME_ACTION,
  payload: { message }
});
