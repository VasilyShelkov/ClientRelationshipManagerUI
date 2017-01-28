import React from 'react';
import moment from 'moment';
import { ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { lightGreen300 } from 'material-ui/styles/colors';
import { ShowCompany } from './ShowCompany';

const setup = ({
  onEditCompany = () => (''),
  onEditSuccessCompanyNotification = ''
}) => {
  const props = {
    name: 'testName',
    address: '123 test address',
    phone: '07123456789',
    updatedAt: moment(),
    onEditCompany,
    onEditSuccessCompanyNotification
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
    expect(wrapper.find(ListItem)[0].prop('primaryText')).to.equal(props.address);
  });

  it('renders the phone number', () => {
    const { wrapper, props } = setup({});
    expect(wrapper.find(ListItem)[1].prop('primaryText')).to.equal(props.phone);
  });

  it('renders the last updated at time', () => {
    const { wrapper } = setup({});

    const notificationChips = wrapper.find(Chip);
    const lastUpdatedChip = notificationChips[0];

    expect(lastUpdatedChip.text()).to.equal('Last Updated: a few seconds ago');
  });

  it('does not render the successfully edited notification when the company was not successfully edited', () => {
    const { wrapper } = setup({});

    const notificationChips = wrapper.find(Chip);
    const lastUpdatedChip = notificationChips[0];

    expect(notificationChips).length.to.be(1);
    expect(lastUpdatedChip.prop('backgroundColor')).to.equal(null);
  });

  it('renders the successfully edited notification', () => {
    const onEditSuccessCompanyNotification = 'test notification';
    const { wrapper } = setup({ onEditSuccessCompanyNotification });

    const notificationChips = wrapper.find(Chip);
    const successNotification = notificationChips[0];
    const lastUpdatedChip = notificationChips[1];

    expect(notificationChips).length.to.be(2);
    expect(successNotification.text()).to.equal(onEditSuccessCompanyNotification);
    expect(lastUpdatedChip.prop('backgroundColor')).to.equal(lightGreen300);
  });

  it('calls onEditCompany when the button is clicked on', sinon.test(function () {
    const onEditCompanySpy = this.spy();
    const { wrapper } = setup({ onEditCompany: onEditCompanySpy });

    const renderedEditButtonClick = wrapper.find(RaisedButton).prop('onClick');
    renderedEditButtonClick();

    expect(onEditCompanySpy).to.have.been.called;
  }));
});
