import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { LARGE } from 'material-ui/utils/withWidth';
import { ListItem } from 'material-ui/List';

import { SideBar } from './SideBar';
import AdminUserListWithData from './AdminUserListWithData';

const setup = ({
  isAdmin = false, open = false, width = LARGE, currentPage = '/test',
  handleChangeRequestSideBar = () => (''),
  handleRouteChange = () => ('')
}) => {
  const props = {
    isAdmin,
    open,
    width,
    currentPage,
    handleChangeRequestSideBar,
    handleRouteChange,
    currentUserId: '0'
  };
  const wrapper = shallowWithContext(<SideBar {...props} />);

  return { wrapper, props };
};

describe('src/app/navigation/SideBar', () => {
  it('renders all the standard navigation links', () => {
    const { wrapper, props } = setup({});

    const dividers = wrapper.find(Divider);
    const pageNavigations = wrapper.find(ListItem);
    expect(dividers).length.to.be(1);

    expect(pageNavigations).length.to.be(4);
    expect(pageNavigations.at(0).prop('primaryText')).to.equal('Profile');
    expect(pageNavigations.at(0).prop('value'))
      .to.equal(JSON.stringify({ newRoute: '/account/profile', id: props.currentUserId }));

    expect(pageNavigations.at(1).prop('primaryText')).to.equal('Unprotected');
    expect(pageNavigations.at(1).prop('value'))
      .to.equal(JSON.stringify({ newRoute: '/account/names/unprotected', id: props.currentUserId }));

    expect(pageNavigations.at(2).prop('primaryText')).to.equal('Protected');
    expect(pageNavigations.at(2).prop('value'))
      .to.equal(JSON.stringify({ newRoute: '/account/names/protected', id: props.currentUserId }));

    expect(pageNavigations.at(3).prop('primaryText')).to.equal('Clients');
    expect(pageNavigations.at(3).prop('value'))
      .to.equal(JSON.stringify({ newRoute: '/account/names/clients', id: props.currentUserId }));
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

  it('does not render admin panel when is not admin', () => {
    const { wrapper } = setup({ isAdmin: false });
    expect(wrapper.find(AdminUserListWithData).exists()).to.be.false;
  });

  it('renders admin panel with the correct props when is admin', sinon.test(function () {
    const handleRouteChange = this.spy();
    const { wrapper, props } = setup({ isAdmin: true, handleRouteChange });

    const adminUserList = wrapper.find(AdminUserListWithData);
    expect(adminUserList.exists()).to.be.true;
    expect(adminUserList.prop('currentUserId')).to.equal(props.currentUserId);
    expect(adminUserList.prop('value')).to.equal(props.currentPage);

    const onRouteChange = adminUserList.prop('onChange');
    onRouteChange();
    expect(handleRouteChange).to.have.been.called;
  }));
});
