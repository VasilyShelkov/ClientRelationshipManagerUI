import React from 'react';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import NamesList from './NamesList';

const setup = names => shallow(<NamesList names={names} />);

describe('src/names/NamesList.js', () => {
  it('renders a create first names button when there are no names', () => {
    const wrapper = setup([]);
    const createName = wrapper.find(RaisedButton);
    expect(wrapper.find(Table).exists()).to.be.false;
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
        phone: '07807886989',
        company: {
          name: 'first company',
          address: '67 manor road',
          phone: '02085005226'
        }
      }
    }];
    const wrapper = setup(names);
    expect(wrapper.find(Table).exists()).to.be.true;
  });
});
