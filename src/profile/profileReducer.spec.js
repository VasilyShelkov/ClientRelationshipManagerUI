import accountReducer, { initialState } from './profileReducer';
import {
  editProfile, EDIT_PROFILE,
  cancelEditProfile, CANCEL_EDIT_PROFILE,
  editProfileSuccess, EDIT_PROFILE_SUCCESS
} from './profileActions';

describe('src/profile/profileReducer.js', () => {
  it(EDIT_PROFILE, () => {
    const stateBefore = initialState;
    const action = editProfile();

    expect(accountReducer(stateBefore, action)).to.deep.equal({
      ...stateBefore,
      editing: true
    });
  });

  it(CANCEL_EDIT_PROFILE, () => {
    const stateBefore = {
      initialState,
      editing: true
    };
    const action = cancelEditProfile();

    expect(accountReducer(stateBefore, action)).to.deep.equal({
      ...stateBefore,
      editing: false
    });
  });

  it(EDIT_PROFILE_SUCCESS, () => {
    const stateBefore = {
      initialState,
      editing: true
    };
    const action = editProfileSuccess();

    expect(accountReducer(stateBefore, action)).to.deep.equal({
      ...stateBefore,
      editing: false
    });
  });
});
