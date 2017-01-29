import React from 'react';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { lightGreen300 } from 'material-ui/styles/colors';
import { ShowCompany } from './ShowCompany';

const setup = ({
  onEditCompany = () => (''),
  editSuccessCompanyNotification = ''
}) => {
  const props = {
    name: 'testName',
    address: '123 test address',
    phone: '07123456789',
    updatedAt: moment(),
    onEditCompany,
    editSuccessCompanyNotification
  };
  const wrapper = shallowWithContext(<ShowCompany {...props} />);

  return { wrapper, props };
};

describe('src/profile/ShowCompany', () => {
  it('renders the name', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find('h2').text()).to.equal(props.name);
  });

  it('renders the address', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find(ListItem).at(0).prop('primaryText')).to.equal(props.address);
  });

  it('renders the phone number', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find(ListItem).at(1).prop('primaryText')).to.equal(props.phone);
  });

  it('renders the last updated at time', () => {
    const { wrapper } = setup({});

    const lastUpdatedChip = wrapper.find(Chip);

    expect(lastUpdatedChip.children().last().text()).to.equal('a few seconds ago');
  });

  it('does not render the successfully edited notification when the company was not successfully edited', () => {
    const { wrapper } = setup({});

    const notificationChips = wrapper.find(Chip);

    expect(notificationChips).length.to.be(1);
  });

  it('renders the successfully edited notification', () => {
    const editSuccessCompanyNotification = 'test notification';
    const { wrapper } = setup({ editSuccessCompanyNotification });

    const notificationChips = wrapper.find(Chip);
    const successNotification = notificationChips.at(0);

    expect(notificationChips).length.to.be(2);
    expect(successNotification.children().last().text()).to.equal(editSuccessCompanyNotification);
  });

  it('calls onEditCompany when the button is clicked on', sinon.test(function () {
    const onEditCompanySpy = this.spy();
    const { wrapper } = setup({ onEditCompany: onEditCompanySpy });

    const renderedEditButtonClick = wrapper.find(RaisedButton).prop('onClick');
    renderedEditButtonClick();

    expect(onEditCompanySpy).to.have.been.called;
  }));
});
