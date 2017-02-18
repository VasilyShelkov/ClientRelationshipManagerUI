export const OPEN_NAME_DETAILS_DRAWER = 'OPEN_NAME_DETAILS_DRAWER';
export const openNameDetailsDrawer = (nameIndex) => ({
  type: OPEN_NAME_DETAILS_DRAWER,
  nameIndex
});

export const CLOSE_NAME_DETAILS_DRAWER = 'CLOSE_NAME_DETAILS_DRAWER';
export const closeNameDetailsDrawer = () => ({
  type: CLOSE_NAME_DETAILS_DRAWER
});
