export const OPEN_NAME_DETAILS_DRAWER = 'OPEN_NAME_DETAILS_DRAWER';
export const openNameDetailsDrawer = (nameIndex) => ({
  type: OPEN_NAME_DETAILS_DRAWER,
  nameIndex
});

export const CLOSE_NAME_DETAILS_DRAWER = 'CLOSE_NAME_DETAILS_DRAWER';
export const closeNameDetailsDrawer = () => ({
  type: CLOSE_NAME_DETAILS_DRAWER
});

export const OPEN_PROTECT_NAME_DIALOG = 'OPEN_PROTECT_NAME_DIALOG';
export const openProtectNameDialog = () => ({
  type: OPEN_PROTECT_NAME_DIALOG
});

export const CLOSE_PROTECT_NAME_DIALOG = 'CLOSE_PROTECT_NAME_DIALOG';
export const closeProtectNameDialog = () => ({
  type: CLOSE_PROTECT_NAME_DIALOG
});
