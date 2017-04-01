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
