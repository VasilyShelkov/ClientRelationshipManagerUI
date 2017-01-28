import moment from 'moment';
import React from 'react';
import { ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import { lightGreen300 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { ShowProfile } from './ShowProfile';
import EditPassword from './EditPassword';

const setup = ({
  onEditProfile = () => (''),
  onEditProfilePassword = () => (''),
  onCancelEditProfilePassword = () => (''),
  editingPassword = false,
  onEditSuccessProfileNotification = ''
}) => {
  const props = {
    firstName: 'Vasily',
    lastName: 'Shelkov',
    phone: '07123456789',
    email: 'vasilyShelkov@gmail.com',
    updatedAt: moment(),
    editingPassword,
    onEditSuccessProfileNotification,
    onEditProfile,
    onEditProfilePassword,
    onCancelEditProfilePassword
  };
  const wrapper = shallowWithContext(<ShowProfile {...props} />);

  return { wrapper, props };
};
describe('src/profile/ShowCompany', () => {
  it('renders the name', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find('h2').text()).to.equal(`${props.firstName} ${props.lastName}`);
  });

  it('renders the email', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find(ListItem)[0].prop('primaryText')).to.equal(props.email);
  });

  it('renders the phone number', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find(ListItem)[1].prop('primaryText')).to.equal(props.phone);
  });

  it('renders the password field when not editing the password', () => {
    const { wrapper } = setup({});
    const listItems = wrapper.find(ListItem);
    expect(listItems.length).to.be(3);
    expect(listItems[2].prop('primaryText')).to.equal('Password');
  });

  it('renders the last updated at time', () => {
    const { wrapper } = setup({});

    const notificationChips = wrapper.find(Chip);
    const lastUpdatedChip = notificationChips[0];

    expect(lastUpdatedChip.text()).to.equal('Last Updated: a few seconds ago');
  });

  it('renders the edit password form when editing password', () => {
    const onCancelEditProfilePassword = 'cancelFunction';
    const { wrapper } = setup({ editingPassword: true, onCancelEditProfilePassword });

    const listItems = wrapper.find(ListItem);
    const editPasswordField = wrapper.find(EditPassword);

    expect(listItems.length).to.be(2);
    expect(editPasswordField.prop('handleCancelEditProfilePassword')).to.be(onCancelEditProfilePassword);
    expect(editPasswordField.exists()).to.be(true);
  });

  it('does not render the successfully edited notification when the company was not successfully edited', () => {
    const { wrapper } = setup({});

    const notificationChips = wrapper.find(Chip);
    const lastUpdatedChip = notificationChips[0];

    expect(notificationChips).length.to.be(1);
    expect(lastUpdatedChip.prop('backgroundColor')).to.equal(null);
  });

  it('renders the successfully edited notification', () => {
    const onEditSuccessProfileNotification = 'test notification';
    const { wrapper } = setup({ onEditSuccessProfileNotification });

    const notificationChips = wrapper.find(Chip);
    const successNotification = notificationChips[0];
    const lastUpdatedChip = notificationChips[1];

    expect(notificationChips).length.to.be(2);
    expect(successNotification.text()).to.equal(onEditSuccessProfileNotification);
    expect(lastUpdatedChip.prop('backgroundColor')).to.equal(lightGreen300);
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

    const renderedEditButtonClick = wrapper.find(ListItem)[2].prop('onClick');
    renderedEditButtonClick();

    expect(onEditProfilePassword).to.have.been.called;
  }));
});
