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
  onEditProfile = () => '',
  onEditProfilePassword = () => '',
  onCancelEditProfilePassword = () => '',
  editingPassword = false,
  editSuccessProfileNotification = '',
}) => {
  const props = {
    id: '0',
    firstName: 'Vasily',
    lastName: 'Shelkov',
    phone: '07123456789',
    email: 'vasilyShelkov@gmail.com',
    protectedNamesLimit: '150',
    updatedAt: moment(),
    editingPassword,
    editSuccessProfileNotification,
    onEditProfile,
    onEditProfilePassword,
    onCancelEditProfilePassword,
  };
  const wrapper = shallowWithContext(<ShowProfile {...props} />);

  return { wrapper, props };
};
describe('src/profile/ShowProfile', () => {
  it('renders the name', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find('h2').text()).toBe(`${props.firstName} ${props.lastName}`);
  });

  it('renders the protectedNameLimit', () => {
    const { wrapper, props } = setup({});
    expect(
      wrapper
        .find(ListItem)
        .at(0)
        .prop('primaryText'),
    ).toBe(`Limit: ${props.protectedNamesLimit}`);
  });

  it('renders the email', () => {
    const { wrapper, props } = setup({});
    expect(
      wrapper
        .find(ListItem)
        .at(1)
        .prop('primaryText'),
    ).toBe(props.email);
  });

  it('renders the phone number', () => {
    const { wrapper, props } = setup({});
    expect(
      wrapper
        .find(ListItem)
        .at(2)
        .prop('primaryText'),
    ).toBe(props.phone);
  });

  it('renders the password field when not editing the password', () => {
    const { wrapper } = setup({});
    const listItems = wrapper.find(ListItem);
    const editPasswordField = wrapper.find(EditPassword);

    expect(listItems.length).toBe(4);
    expect(editPasswordField.exists()).toBe(false);
    expect(listItems.at(3).prop('primaryText')).toBe('Password');
  });

  it('renders the edit password form when editing password', () => {
    const onCancelEditProfilePassword = 'cancelFunction';
    const { wrapper, props } = setup({
      editingPassword: true,
      onCancelEditProfilePassword,
    });

    const listItems = wrapper.find(ListItem);
    const editPasswordField = wrapper.find(EditPassword);

    expect(listItems.length).toBe(3);
    expect(editPasswordField.exists()).toBe(true);
    expect(editPasswordField.prop('userId')).toBe(props.id);
    expect(editPasswordField.prop('editInProgress')).toBe(false);
    expect(editPasswordField.prop('handleCancelEditProfilePassword')).toBe(onCancelEditProfilePassword);
  });

  it('renders the edit password form when in progress of editing password', () => {
    const { wrapper } = setup({ editingPassword: EDIT_IN_PROGRESS });

    const editPasswordField = wrapper.find(EditPassword);

    expect(editPasswordField.exists()).toBe(true);
    expect(editPasswordField.prop('editInProgress')).toBe(true);
  });

  it('renders the last updated at time', () => {
    const { wrapper } = setup({});

    const lastUpdatedChip = wrapper.find(Chip);

    expect(
      lastUpdatedChip
        .children()
        .last()
        .text(),
    ).toBe('a few seconds ago');
  });

  it('does not render the successfully edited notification when the company was not successfully edited', () => {
    const { wrapper } = setup({});

    const notificationChips = wrapper.find(Chip);
    const lastUpdatedChip = notificationChips.at(0);

    expect(notificationChips.length).toBe(1);
  });

  it('renders the successfully edited notification', () => {
    const editSuccessProfileNotification = 'test notification';
    const { wrapper } = setup({ editSuccessProfileNotification });

    const notificationChips = wrapper.find(Chip);
    const successNotification = notificationChips.at(0);

    expect(notificationChips.length).toBe(2);
    expect(
      successNotification
        .children()
        .last()
        .text(),
    ).toBe(editSuccessProfileNotification);
  });

  it('calls onEditProfile when the button is clicked on', () => {
    const onEditProfile = jest.fn();
    const { wrapper } = setup({ onEditProfile });

    const renderedEditButtonClick = wrapper
      .find(RaisedButton)
      .prop('onClick');
    renderedEditButtonClick();

    expect(onEditProfile).toHaveBeenCalled();
  });

  it('calls onEditProfilePassword when the button is clicked on', () => {
    const onEditProfilePassword = jest.fn();
    const { wrapper } = setup({ onEditProfilePassword });

    const renderedEditButtonClick = wrapper
      .find(ListItem)
      .at(3)
      .prop('onClick');
    renderedEditButtonClick();

    expect(onEditProfilePassword).toHaveBeenCalled();
  });
});
