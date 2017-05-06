import React from 'react';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { ListItem } from 'material-ui/List';

import { CompanyDetails } from './CompanyDetails';
import EditNameCompanyForm from './edit/EditNameCompanyForm';

describe('src/names/selected/CompanyDetails', () => {
  it('renders name information when not editing', () => {
    const showingEditCompanyForm = false;
    const name = 'testCompanyName';
    const phone = 'testPhone';
    const address = '12 test street';
    const company = { name, phone, address };
    const showEditCompanyForm = () => 'show form';

    const wrapper = shallow(
      <CompanyDetails
        showingEditCompanyForm={showingEditCompanyForm}
        company={company}
        showEditCompanyForm={showEditCompanyForm}
      />
    );

    // id used for feature testing
    expect(wrapper.find(EditIcon).prop('id')).to.equal('editCompany');
    expect(wrapper.find(EditIcon).prop('onClick')).to.equal(showEditCompanyForm);

    expect(wrapper.find(ListItem).first().prop('primaryText')).to.include(name);
    expect(wrapper.find(ListItem).at(1).prop('primaryText')).to.include(phone);
    expect(wrapper.find(ListItem).last().prop('primaryText')).to.include(address);
  });

  it('renders edit name form when editing', () => {
    const showingEditCompanyForm = true;
    const userId = 'testId';
    const name = 'testCompanyName';
    const phone = 'testPhone';
    const address = '12 test street';
    const company = { name, phone, address };
    const hideEditCompanyForm = () => 'hide form';

    const wrapper = shallow(
      <CompanyDetails
        showingEditCompanyForm={showingEditCompanyForm}
        userId={userId}
        company={company}
        hideEditCompanyForm={hideEditCompanyForm}
      />
    );

    const editNameForm = wrapper.find(EditNameCompanyForm);

    expect(editNameForm.prop('userId')).to.equal(userId);
    expect(editNameForm.prop('initialValues')).to.deep.equal(company);
    expect(editNameForm.prop('cancelEditNameCompany')).to.equal(hideEditCompanyForm);
  });
});
