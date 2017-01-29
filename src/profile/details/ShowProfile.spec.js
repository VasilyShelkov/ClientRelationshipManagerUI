import moment from 'moment';
import React from 'react';
import { ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import { lightGreen300 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { ShowProfile } from './ShowProfile';
import EditPassword from './EditPassword';
import { EDIT_IN_PROGRESS } from '../profileReducer';

const setup = ({
  onEditProfile = () => (''),
  onEditProfilePassword = () => (''),
  onCancelEditProfilePassword = () => (''),
  editingPassword = false,
  editSuccessProfileNotification = ''
}) => {
  const props = {
    userId: '0',
    firstName: 'Vasily',
    lastName: 'Shelkov',
    phone: '07123456789',
    email: 'vasilyShelkov@gmail.com',
    updatedAt: moment(),
    editingPassword,
    editSuccessProfileNotification,
    onEditProfile,
    onEditProfilePassword,
    onCancelEditProfilePassword
  };
  const wrapper = shallowWithContext(<ShowProfile {...props} />);

  return { wrapper, props };
};
describe('src/profile/ShowProfile', () => {
  it('renders the name', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find('h2').text()).to.equal(`${props.firstName} ${props.lastName}`);
  });

  it('renders the email', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find(ListItem).at(0).prop('primaryText')).to.equal(props.email);
  });

  it('renders the phone number', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find(ListItem).at(1).prop('primaryText')).to.equal(props.phone);
  });

  it('renders the password field when not editing the password', () => {
    const { wrapper } = setup({});
    const listItems = wrapper.find(ListItem);
    const editPasswordField = wrapper.find(EditPassword);

    expect(listItems).length.to.be(3);
    expect(editPasswordField.exists()).to.be.false;
    expect(listItems.at(2).prop('primaryText')).to.equal('Password');
  });

  it('renders the edit password form when editing password', () => {
    const onCancelEditProfilePassword = 'cancelFunction';
    const { wrapper, props } = setup({ editingPassword: true, onCancelEditProfilePassword });

    const listItems = wrapper.find(ListItem);
    const editPasswordField = wrapper.find(EditPassword);

    expect(listItems).length.to.be(2);
    expect(editPasswordField.exists()).to.be.true;
    expect(editPasswordField.prop('userId')).to.equal(props.userId);
    expect(editPasswordField.prop('editInProgress')).to.equal(false);
    expect(editPasswordField.prop('handleCancelEditProfilePassword')).to.equal(onCancelEditProfilePassword);
  });

  it('renders the edit password form when in progress of editing password', () => {
    const { wrapper } = setup({ editingPassword: EDIT_IN_PROGRESS });

    const editPasswordField = wrapper.find(EditPassword);

    expect(editPasswordField.exists()).to.be.true;
    expect(editPasswordField.prop('editInProgress')).to.equal(true);
  });

  it('renders the last updated at time', () => {
    const { wrapper } = setup({});

    const lastUpdatedChip = wrapper.find(Chip);

    expect(lastUpdatedChip.children().last().text()).to.equal('a few seconds ago');
  });

  it('does not render the successfully edited notification when the company was not successfully edited', () => {
    const { wrapper } = setup({});

    const notificationChips = wrapper.find(Chip);
    const lastUpdatedChip = notificationChips.at(0);

    expect(notificationChips).length.to.be(1);
  });

  it('renders the successfully edited notification', () => {
    const editSuccessProfileNotification = 'test notification';
    const { wrapper } = setup({ editSuccessProfileNotification });

    const notificationChips = wrapper.find(Chip);
    const successNotification = notificationChips.at(0);

    expect(notificationChips).length.to.be(2);
    expect(successNotification.children().last().text()).to.equal(editSuccessProfileNotification);
  });

  it('calls onEditProfile when the button is clicked on', sinon.test(function () {
    const onEditProfile = this.spy();
    const { wrapper } = setup({ onEditProfile });

    const renderedEditButtonClick = wrapper.find(RaisedButton).prop('onClick');
    renderedEditButtonClick();

    expect(onEditProfile).to.have.been.called;
  }));

  it('calls onEditProfilePassword when the button is clicked on', sinon.test(function () {
    const onEditProfilePassword = this.spy();
    const { wrapper } = setup({ onEditProfilePassword });

    const renderedEditButtonClick = wrapper.find(ListItem).at(2).prop('onClick');
    renderedEditButtonClick();

    expect(onEditProfilePassword).to.have.been.called;
  }));
});
