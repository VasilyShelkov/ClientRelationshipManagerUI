export const OPEN_PROTECT_NAME_DIALOG = 'OPEN_PROTECT_NAME_DIALOG';
export const openProtectNameDialog = () => ({
  type: OPEN_PROTECT_NAME_DIALOG,
});

export const CLOSE_PROTECT_NAME_DIALOG = 'CLOSE_PROTECT_NAME_DIALOG';
export const closeProtectNameDialog = () => ({
  type: CLOSE_PROTECT_NAME_DIALOG,
});

export const OPEN_CLIENT_NAME_DIALOG = 'OPEN_CLIENT_NAME_DIALOG';
export const openClientNameDialog = () => ({
  type: OPEN_CLIENT_NAME_DIALOG,
});

export const CLOSE_CLIENT_NAME_DIALOG = 'CLOSE_CLIENT_NAME_DIALOG';
export const closeClientNameDialog = () => ({
  type: CLOSE_CLIENT_NAME_DIALOG,
});

export const OPEN_MET_WITH_PROTECTED_DIALOG = 'OPEN_MET_WITH_PROTECTED_DIALOG';
export const openMetWithProtectedDialog = () => ({
  type: OPEN_MET_WITH_PROTECTED_DIALOG,
});

export const CLOSE_MET_WITH_PROTECTED_DIALOG =
  'CLOSE_MET_WITH_PROTECTED_DIALOG';
export const closeMetWithProtectedDialog = () => ({
  type: CLOSE_MET_WITH_PROTECTED_DIALOG,
});

export const SELECT_NAME = 'SELECT_NAME';
export const selectName = (typedName, listWithSelectedName, namePosition) => ({
  type: SELECT_NAME,
  typedName,
  listWithSelectedName,
  namePosition,
});

export const HIDE_NAME = 'HIDE_NAME';
export const hideName = listWithSelectedNameToHide => ({
  type: HIDE_NAME,
  listWithSelectedNameToHide,
});

export const SHOW_EDIT_NAME = 'SHOW_EDIT_NAME';
export const showEditName = () => ({
  type: SHOW_EDIT_NAME,
});

export const HIDE_EDIT_NAME = 'HIDE_EDIT_NAME';
export const hideEditName = () => ({
  type: HIDE_EDIT_NAME,
});

export const SHOW_EDIT_NAME_COMPANY = 'SHOW_EDIT_NAME_COMPANY';
export const showEditNameCompany = () => ({
  type: SHOW_EDIT_NAME_COMPANY,
});

export const HIDE_EDIT_NAME_COMPANY = 'HIDE_EDIT_NAME_COMPANY';
export const hideEditNameCompany = () => ({
  type: HIDE_EDIT_NAME_COMPANY,
});
