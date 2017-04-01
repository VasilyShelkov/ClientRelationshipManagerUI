import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { NamesList } from './NamesList';
import Name from './Name';

const setup = names => shallow(<NamesList names={names} />);

xdescribe('src/names/NamesList.js', () => {
  it('renders a create first names button when there are no names', () => {
    const wrapper = setup([]);
    const createName = wrapper.find(RaisedButton);
    expect(wrapper.find(Name).exists()).to.be.false;
    expect(createName.exists()).to.be.true;
    expect(createName.prop('primary')).to.be.true;
    expect(createName.prop('label')).to.equal('Create first name');
    expect(createName.prop('fullWidth')).to.be.true;
  });

  it('renders a table when there are names', () => {
    const names = [{
      created_at: 'today',
      name: {
        firstName: 'Vasia',
        lastName: 'Shelkov',
        phone: '07801234567',
        company: {
          name: 'first company',
          address: '321 company address',
          phone: '02081234567'
        }
      }
    }, {
      created_at: 'today',
      name: {
        firstName: 'lara',
        lastName: 'phillips',
        phone: '07807654321',
        company: {
          name: 'second company',
          address: '123 company address',
          phone: '02087654321'
        }
      }
    }];
    const wrapper = setup(names);
    expect(wrapper.find(Name)).length.to.be(names.length);
  });
});
