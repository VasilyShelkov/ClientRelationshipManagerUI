import React from 'react';
import Profile from './Profile';
import LoadingSpinner from '../shared/LoadingSpinner';
import ShowProfileWithData from './details/ShowProfile';
import EditProfile from './details/EditProfile';
import ShowCompanyWithData from './company/ShowCompany';
import EditCompany from './company/EditCompany';
import { EDIT_IN_PROGRESS } from './profileReducer';

const setup = ({
  editingProfile = false,
  editingCompany = false,
  displayCompany = true,
  displayNewProfileNotification = false,
  onCancelEditProfile = () => '',
  onCancelEditCompany = () => ''
}) => {
  const props = {
    user: {
      id: '123',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      phone: '07123456789',
      email: 'test@email.com',
      updated_at: 'today',
      company: {
        name: 'testCompany',
        address: '123 test address',
        phone: '07123456789',
        updated_at: 'today'
      }
    },
    editingProfile,
    editingCompany,
    displayCompany,
    displayNewProfileNotification,
    onCancelEditProfile,
    onCancelEditCompany
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
    expect(ShowProfileComponent.prop('userId')).to.equal(props.user.id);
    expect(ShowProfileComponent.prop('firstName')).to.equal(props.user.firstName);
    expect(ShowProfileComponent.prop('lastName')).to.equal(props.user.lastName);
    expect(ShowProfileComponent.prop('phone')).to.equal(props.user.phone);
    expect(ShowProfileComponent.prop('email')).to.equal(props.user.email);
    expect(ShowProfileComponent.prop('updatedAt')).to.equal(props.user.updated_at);
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

  it('renders show company when not editing their company', () => {
    const { wrapper, props } = setup({});
    const ShowCompanyComponent = wrapper.find(ShowCompanyWithData);

    expect(wrapper.find(EditCompany).exists()).to.be.false;
    expect(ShowCompanyComponent.exists()).to.be.true;
    expect(ShowCompanyComponent.prop('name')).to.equal(props.user.company.name);
    expect(ShowCompanyComponent.prop('address')).to.equal(props.user.company.address);
    expect(ShowCompanyComponent.prop('phone')).to.equal(props.user.company.phone);
    expect(ShowCompanyComponent.prop('updatedAt')).to.equal(props.user.company.updated_at);
  });

  it('renders edit company when editing their company', () => {
    const onCancelEditCompany = () => 'test function';
    const { wrapper, props } = setup({ editingCompany: true, onCancelEditCompany });
    const EditCompanyComponent = wrapper.find(EditCompany);

    expect(wrapper.find(ShowCompanyWithData).exists()).to.be.false;
    expect(EditCompanyComponent.exists()).to.be.true;
    expect(EditCompanyComponent.prop('userId')).to.equal(props.user.id);
    expect(EditCompanyComponent.prop('initialValues')).to.deep.equal(props.user.company);
    expect(EditCompanyComponent.prop('handleCancelEditCompany')).to.equal(onCancelEditCompany);
    expect(EditCompanyComponent.prop('editInProgess')).to.equal(false);
  });

  it('renders edit company when in progress editing their company', () => {
    const { wrapper } = setup({ editingCompany: EDIT_IN_PROGRESS });
    const EditCompanyComponent = wrapper.find(EditCompany);

    expect(EditCompanyComponent.exists()).to.be.true;
    expect(EditCompanyComponent.prop('editInProgess')).to.equal(true);
  });

  it('renders show company when displaying company', () => {
    const { wrapper } = setup({ displayCompany: true });

    const ShowCompanyComponent = wrapper.find(ShowCompanyWithData);
    expect(ShowCompanyComponent.exists()).to.be.true;

    const ShowProfileComponent = wrapper.find(ShowProfileWithData);
    expect(ShowProfileComponent.parent().hasClass('col-12 col-sm-6 push-sm-6 align-self-center')).to.be.true;
  });

  it('does not render show company when not displaying company', () => {
    const { wrapper } = setup({ displayCompany: false });

    const ShowCompanyComponent = wrapper.find(ShowCompanyWithData);
    expect(ShowCompanyComponent.exists()).to.be.false;

    const ShowProfileComponent = wrapper.find(ShowProfileWithData);
    expect(ShowProfileComponent.parent().hasClass('col-12')).to.be.true;
  });
});
