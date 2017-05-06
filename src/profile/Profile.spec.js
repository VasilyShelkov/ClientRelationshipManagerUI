import React from 'react';
import Profile from './Profile';
import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfileWithData from './details/ShowProfile';
import EditProfile from './details/EditProfile';
import { EDIT_IN_PROGRESS } from './profileReducer';

const setup = ({
  editingProfile = false,
  displayCompany = false,
  onCancelEditProfile = () => (''),
}) => {
  const props = {
    user: {
      id: '123',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      phone: '07123456789',
      email: 'test@email.com',
      protectedNamesLimit: 150,
      updated_at: 'today'
    },
    editingProfile,
    onCancelEditProfile,
    displayCompany
  };
  const wrapper = shallow(<Profile {...props} />);

  return { wrapper, props };
};

describe('src/profile/Profile.js', () => {
  it('renders a spinner when loading', () => {
    const wrapper = shallow(<Profile loading />);
    expect(wrapper.find(LoadingSpinner).exists()).to.be.true;
  });

  it('renders show profile when not editing the profile with correct props', () => {
    const { wrapper, props } = setup({});
    const ShowProfileComponent = wrapper.find(ShowProfileWithData);

    expect(wrapper.find(EditProfile).exists()).to.be.false;
    expect(ShowProfileComponent.exists()).to.be.true;
    expect(ShowProfileComponent.prop('id')).to.equal(props.user.id);
    expect(ShowProfileComponent.prop('firstName')).to.equal(props.user.firstName);
    expect(ShowProfileComponent.prop('lastName')).to.equal(props.user.lastName);
    expect(ShowProfileComponent.prop('phone')).to.equal(props.user.phone);
    expect(ShowProfileComponent.prop('email')).to.equal(props.user.email);
    expect(ShowProfileComponent.prop('updated_at')).to.equal(props.user.updated_at);
    expect(ShowProfileComponent.prop('protectedNamesLimit')).to.equal(props.user.protectedNamesLimit);
    expect(ShowProfileComponent.parent().hasClass('col-12')).to.be.true;
  });

  it('renders edit profile when editing the profile', () => {
    const onCancelEditProfile = () => 'test function';
    const { wrapper, props } = setup({ editingProfile: true, onCancelEditProfile });
    const EditProfileComponent = wrapper.find(EditProfile);

    expect(wrapper.find(ShowProfileWithData).exists()).to.be.false;
    expect(EditProfileComponent.exists()).to.be.true;
    expect(EditProfileComponent.prop('initialValues')).to.deep.equal(props.user);
    expect(EditProfileComponent.prop('handleCancelEditProfile')).to.equal(onCancelEditProfile);
    expect(EditProfileComponent.prop('editInProgess')).to.equal(false);
  });

  it('renders edit profile when in progress of editing the profile', () => {
    const { wrapper } = setup({ editingProfile: EDIT_IN_PROGRESS });
    const EditProfileComponent = wrapper.find(EditProfile);

    expect(EditProfileComponent.exists()).to.be.true;
    expect(EditProfileComponent.prop('editInProgess')).to.equal(true);
  });

  it('renders profile with different class when displaying company', () => {
    const { wrapper } = setup({ displayCompany: true });

    const ShowProfileComponent = wrapper.find(ShowProfileWithData);
    expect(ShowProfileComponent.parent().hasClass('col-12 col-sm-6 push-sm-6 align-self-center')).to.be.true;
  });
});
