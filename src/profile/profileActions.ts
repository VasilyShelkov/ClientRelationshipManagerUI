import { createAction } from 'typesafe-actions';

interface Payload {
  currentUserId: string;
  userIdToShow: string;
  isNewUser: boolean;
}
export const CHANGE_SHOWN_USER_PROFILE = 'CHANGE_SHOWN_USER_PROFILE';
export const changeShownUserProfile = createAction(
  CHANGE_SHOWN_USER_PROFILE,
  resolve => ({ currentUserId, userIdToShow, isNewUser }: Payload) => ({
    type: CHANGE_SHOWN_USER_PROFILE,
    payload: {
      currentUserId,
      userIdToShow,
      isNewUser,
    },
  }),
);

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const editProfile = createAction(EDIT_PROFILE, resolve => () => ({
  type: EDIT_PROFILE,
}));

export const CANCEL_EDIT_PROFILE = 'CANCEL_EDIT_PROFILE';
export const cancelEditProfile = createAction(
  CANCEL_EDIT_PROFILE,
  resolve => () => ({
    type: CANCEL_EDIT_PROFILE,
  }),
);

export const EDIT_PROFILE_PASSWORD = 'EDIT_PROFILE_PASSWORD';
export const editProfilePassword = createAction(
  EDIT_PROFILE_PASSWORD,
  resolve => () => ({
    type: EDIT_PROFILE_PASSWORD,
  }),
);

export const CANCEL_EDIT_PROFILE_PASSWORD = 'CANCEL_EDIT_PROFILE_PASSWORD';
export const cancelEditProfilePassword = createAction(
  CANCEL_EDIT_PROFILE_PASSWORD,
  resolve => () => ({
    type: CANCEL_EDIT_PROFILE_PASSWORD,
  }),
);

export const EDIT_COMPANY = 'EDIT_COMPANY';
export const editCompany = createAction(EDIT_COMPANY, resolve => () => ({
  type: EDIT_COMPANY,
}));

export const CANCEL_EDIT_COMPANY = 'CANCEL_EDIT_COMPANY';
export const cancelEditCompany = createAction(
  CANCEL_EDIT_COMPANY,
  resolve => () => ({
    type: CANCEL_EDIT_COMPANY,
  }),
);

export const REMOVE_PROFILE_NOTIFICATION = 'REMOVE_PROFILE_NOTIFICATION';
export const removeProfileNotification = createAction(
  REMOVE_PROFILE_NOTIFICATION,
  resolve => () => ({
    type: REMOVE_PROFILE_NOTIFICATION,
  }),
);
