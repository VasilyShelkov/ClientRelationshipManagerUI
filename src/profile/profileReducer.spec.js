import accountReducer, {
  initialState,
  EDIT_IN_PROGRESS,
} from './profileReducer';
import {
  logInSuccess,
  LOGGED_IN_SUCCESSFULLY,
} from '../authentication/accountActions';
import {
  APOLLO_MUTATION_INIT,
  APOLLO_MUTATION_RESULT,
} from '../app/thirdPartyActions';
import {
  editProfile,
  EDIT_PROFILE,
  cancelEditProfile,
  CANCEL_EDIT_PROFILE,
  editProfilePassword,
  EDIT_PROFILE_PASSWORD,
  cancelEditProfilePassword,
  CANCEL_EDIT_PROFILE_PASSWORD,
  editCompany,
  EDIT_COMPANY,
  cancelEditCompany,
  CANCEL_EDIT_COMPANY,
  removeProfileNotification,
  REMOVE_PROFILE_NOTIFICATION,
  changeShownUserProfile,
  CHANGE_SHOWN_USER_PROFILE,
} from './profileActions';

describe('src/profile/profileReducer.js', () => {
  describe(CHANGE_SHOWN_USER_PROFILE, () => {
    it('sets the new user id and set display company to true when the user to show and current user are the same', () => {
      const stateBefore = { ...initialState, id: '1' };
      const newUserId = '2';
      const action = changeShownUserProfile({
        currentUserId: newUserId,
        userIdToShow: newUserId,
        isNewUser: false,
      });

      expect(accountReducer(stateBefore, action)).toEqual({
        ...initialState,
        id: newUserId,
        display: {
          company: true,
        },
      });
    });

    it('sets the new user id and set display company to false when the user to show and current user are different', () => {
      const stateBefore = { ...initialState, id: '1' };
      const newUserId = '2';
      const action = changeShownUserProfile({
        currentUserId: '3',
        userIdToShow: newUserId,
        isNewUser: false,
      });

      expect(accountReducer(stateBefore, action)).toEqual({
        ...initialState,
        id: newUserId,
        display: {
          company: false,
        },
      });
    });

    it('sets the new user id and sets isNewUser to true', () => {
      const stateBefore = { ...initialState, id: '1' };
      const newUserId = '2';
      const action = changeShownUserProfile({
        currentUserId: newUserId,
        userIdToShow: newUserId,
        isNewUser: true,
      });

      expect(accountReducer(stateBefore, action)).toEqual({
        ...initialState,
        id: newUserId,
        display: {
          company: true,
        },
        notification: {
          ...initialState.notification,
          newUser: 'Successfully created new user',
        },
      });
    });
  });

  it(LOGGED_IN_SUCCESSFULLY, () => {
    const stateBefore = initialState;
    const user = { id: '123' };
    const action = logInSuccess(user);

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      id: user.id,
    });
  });

  it(EDIT_PROFILE, () => {
    const stateBefore = initialState;
    const action = editProfile();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      editing: {
        ...stateBefore.editing,
        profile: true,
      },
    });
  });

  it(CANCEL_EDIT_PROFILE, () => {
    const stateBefore = initialState;
    const action = cancelEditProfile();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      editing: {
        ...stateBefore.editing,
        profile: false,
      },
    });
  });

  it(EDIT_PROFILE_PASSWORD, () => {
    const stateBefore = initialState;
    const action = editProfilePassword();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      editing: {
        ...stateBefore.editing,
        password: true,
      },
    });
  });

  it(CANCEL_EDIT_PROFILE_PASSWORD, () => {
    const stateBefore = initialState;
    const action = cancelEditProfilePassword();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      editing: {
        ...stateBefore.editing,
        password: false,
      },
    });
  });

  it(EDIT_COMPANY, () => {
    const stateBefore = initialState;
    const action = editCompany();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      editing: {
        ...stateBefore.editing,
        company: true,
      },
    });
  });

  it(CANCEL_EDIT_COMPANY, () => {
    const stateBefore = initialState;
    const action = cancelEditCompany();

    expect(accountReducer(stateBefore, action)).toEqual({
      ...stateBefore,
      editing: {
        ...stateBefore.editing,
        company: false,
      },
    });
  });

  it(REMOVE_PROFILE_NOTIFICATION, () => {
    const stateBefore = {
      ...initialState,
      notification: {
        company: 'test notification',
        profile: '',
      },
    };
    const action = removeProfileNotification();

    expect(accountReducer(stateBefore, action)).toEqual(initialState);
  });

  describe(APOLLO_MUTATION_INIT, () => {
    it('EditUserDetails', () => {
      const stateBefore = initialState;
      const action = {
        type: APOLLO_MUTATION_INIT,
        operationName: 'EditUserDetails',
        result: { data: {} },
      };

      expect(accountReducer(stateBefore, action)).toEqual({
        ...stateBefore,
        editing: { ...stateBefore.editing, profile: EDIT_IN_PROGRESS },
      });
    });

    it('EditUserPassword', () => {
      const stateBefore = initialState;
      const action = {
        type: APOLLO_MUTATION_INIT,
        operationName: 'EditUserPassword',
        result: { data: {} },
      };

      expect(accountReducer(stateBefore, action)).toEqual({
        ...stateBefore,
        editing: { ...stateBefore.editing, password: EDIT_IN_PROGRESS },
      });
    });

    it('EditCompanyDetails', () => {
      const stateBefore = initialState;
      const action = {
        type: APOLLO_MUTATION_INIT,
        operationName: 'EditCompanyDetails',
        result: { data: {} },
      };

      expect(accountReducer(stateBefore, action)).toEqual({
        ...stateBefore,
        editing: { ...stateBefore.editing, company: EDIT_IN_PROGRESS },
      });
    });
  });

  describe(APOLLO_MUTATION_RESULT, () => {
    it('EditUserDetails', () => {
      const stateBefore = initialState;
      const action = {
        type: APOLLO_MUTATION_RESULT,
        operationName: 'EditUserDetails',
        result: { data: {} },
      };

      expect(accountReducer(stateBefore, action)).toEqual({
        ...stateBefore,
        editing: { ...stateBefore.editing, profile: false },
        notification: { profile: 'Successfully updated', company: '' },
      });
    });

    it('EditUserPassword', () => {
      const stateBefore = initialState;
      const action = {
        type: APOLLO_MUTATION_RESULT,
        operationName: 'EditUserPassword',
        result: { data: {} },
      };

      expect(accountReducer(stateBefore, action)).toEqual({
        ...stateBefore,
        editing: { ...stateBefore.editing, password: false },
        notification: { profile: 'Successfully updated password', company: '' },
      });
    });

    it('EditCompanyDetails', () => {
      const stateBefore = initialState;
      const action = {
        type: APOLLO_MUTATION_RESULT,
        operationName: 'EditCompanyDetails',
        result: { data: {} },
      };

      expect(accountReducer(stateBefore, action)).toEqual({
        ...stateBefore,
        editing: { ...stateBefore.editing, company: false },
        notification: { profile: '', company: 'Successfully updated' },
      });
    });
  });
});
