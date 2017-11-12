export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const showNotification = (message, color) => ({
  type: SHOW_NOTIFICATION,
  payload: { message, color },
});

export const CLOSE_NOTIFICATION = 'CLOSE_SUCCESS_NOTIFICATION';
export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
});
