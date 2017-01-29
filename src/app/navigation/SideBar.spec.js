import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { LARGE } from 'material-ui/utils/withWidth';
import { ListItem } from 'material-ui/List';

import { SideBar } from './SideBar';
import AdminUserListWithData from './AdminUserList';

const setup = ({
  isAdmin = false, open = false, width = LARGE, currentPage = '',
  handleChangeRequestSideBar = () => (''),
  handleRouteChange = () => ('')
}) => {
  const props = {
    isAdmin,
    open,
    width,
    currentPage,
    handleChangeRequestSideBar,
    handleRouteChange
  };
  const wrapper = shallowWithContext(<SideBar {...props} />);

  return { wrapper, props };
};

describe('src/app/navigation/SideBar', () => {
  it('renders all the standard navigation links', () => {
    const { wrapper } = setup({});

    const dividers = wrapper.find(Divider);
    const pageNavigations = wrapper.find(ListItem);
    expect(dividers).length.to.be(1);

    expect(pageNavigations).length.to.be(4);
    expect(pageNavigations.at(0).prop('primaryText')).to.equal('Profile');
    expect(pageNavigations.at(0).prop('value')).to.equal('/account/profile');

    expect(pageNavigations.at(1).prop('primaryText')).to.equal('Unprotected');
    expect(pageNavigations.at(1).prop('value')).to.equal('/account/names/unprotected');

    expect(pageNavigations.at(2).prop('primaryText')).to.equal('Protected');
    expect(pageNavigations.at(2).prop('value')).to.equal('/account/names/protected');

    expect(pageNavigations.at(3).prop('primaryText')).to.equal('Clients');
    expect(pageNavigations.at(3).prop('value')).to.equal('/account/names/clients');
  });

  it('is docked if the width is large', () => {
    const { wrapper } = setup({});
    expect(wrapper.find(Drawer).prop('docked')).to.be.true;
  });

  it('is not docked if the width is not large', () => {
    const { wrapper } = setup({ width: 'small' });
    expect(wrapper.find(Drawer).prop('docked')).to.be.false;
  });

  it('is open if open and the width is large', () => {
    const { wrapper } = setup({ open: true, width: LARGE });
    expect(wrapper.find(Drawer).prop('open')).to.be.true;
  });

  it('is open if not open and the width is large', () => {
    const { wrapper } = setup({ open: false, width: LARGE });
    expect(wrapper.find(Drawer).prop('open')).to.be.true;
  });

  it('is open if open and the width is not large', () => {
    const { wrapper } = setup({ open: true, width: 'small' });
    expect(wrapper.find(Drawer).prop('open')).to.be.true;
  });

  it('is not open if not open and the width is not large', () => {
    const { wrapper } = setup({ open: false, width: 'small' });
    expect(wrapper.find(Drawer).prop('open')).to.be.false;
  });

  it('does not show admin panel when is not admin', () => {
    const { wrapper } = setup({ isAdmin: false });
    expect(wrapper.find(AdminUserListWithData).exists()).to.be.false;
  });

  it('shows admin panel when is admin', () => {
    const { wrapper } = setup({ isAdmin: true });
    expect(wrapper.find(AdminUserListWithData).exists()).to.be.true;
  });
});
