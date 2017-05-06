import React from 'react';
import { Company as CompanyProfile } from './Company';
import ShowCompanyWithData from './ShowCompany';
import EditCompany from './EditCompany';
import { EDIT_IN_PROGRESS } from '../profileReducer';

const setup = ({
  editingCompany = false,
  display = true,
  onCancelEditCompany = () => ('')
}) => {
  const props = {
    user: {
      id: '123',
      company: {
        name: 'testCompany',
        address: '123 test address',
        phone: '07123456789',
        updated_at: 'today'
      }
    },
    display,
    editingCompany,
    onCancelEditCompany
  };
  const wrapper = shallow(<CompanyProfile {...props} />);

  return { wrapper, props };
};

describe('src/profile/company/Company', () => {
  it('renders show company when displaying company', () => {
    const { wrapper } = setup({ display: true });

    const ShowCompanyComponent = wrapper.find(ShowCompanyWithData);
    expect(ShowCompanyComponent.exists()).to.be.true;
  });

  it('does not render show company when not displaying company', () => {
    const { wrapper } = setup({ display: false });

    const ShowCompanyComponent = wrapper.find(ShowCompanyWithData);
    expect(ShowCompanyComponent.exists()).to.be.false;
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
    const onCancelEditCompany = () => ('test function');
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
});
