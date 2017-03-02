export const SELECT_NAME = 'SELECT_NAME';
export const selectName = nameId => ({
  type: SELECT_NAME,
  nameId
});

export const HIDE_NAME = 'HIDE_NAME';
export const hideName = () => ({
  type: HIDE_NAME
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

export const OPEN_MET_WITH_PROTECTED_DIALOG = 'OPEN_MET_WITH_PROTECTED_DIALOG';
export const openMetWithProtectedDialog = () => ({
  type: OPEN_MET_WITH_PROTECTED_DIALOG
});

export const CLOSE_MET_WITH_PROTECTED_DIALOG = 'CLOSE_MET_WITH_PROTECTED_DIALOG';
export const closeMetWithProtectedDialog = () => ({
  type: CLOSE_MET_WITH_PROTECTED_DIALOG
});

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

export const OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG = 'OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG';
export const openEditProtectedNameMeetingDialog = nameId => ({
  type: OPEN_EDIT_PROTECTED_NAME_MEETING_DIALOG,
  nameId
});

export const CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG = 'CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG';
export const closeEditProtectedNameMeetingDialog = () => ({
  type: CLOSE_EDIT_PROTECTED_NAME_MEETING_DIALOG,
});

export const OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG = 'OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG';
export const openEditProtectedNameCallDialog = nameId => ({
  type: OPEN_EDIT_PROTECTED_NAME_CALL_DIALOG,
  nameId
});

export const CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG = 'CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG';
export const closeEditProtectedNameCallDialog = () => ({
  type: CLOSE_EDIT_PROTECTED_NAME_CALL_DIALOG,
});
