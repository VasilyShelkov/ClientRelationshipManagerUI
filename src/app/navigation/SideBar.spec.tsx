import * as React from 'react';
import { shallow } from 'enzyme';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import { SideBar } from './SideBar';
// import AdminUserListWithData from './AdminUserListWithData';

interface SetupOptions {
  isAdmin: boolean;
  currentPage: string;
  handleRouteChange: () => void;
  protectedListToShow: 'protected' | 'metWithProtected';
}
const setup = ({
  isAdmin = false,
  currentPage = '/test',
  handleRouteChange = () => '',
  protectedListToShow = 'protected',
}: SetupOptions) => {
  const props = {
    isAdmin,
    currentPage,
    handleRouteChange,
    currentUserId: '0',
    profileUserId: '0',
    protectedListToShow,
  };
  const wrapper = shallow(<SideBar {...props} />);

  return { wrapper, props };
};

describe('src/app/navigation/SideBar', () => {
  it('renders all the standard navigation links', () => {
    const { wrapper, props } = setup({});

    const dividers = wrapper.find(Divider);
    const pageNavigations = wrapper.find(ListItem);
    expect(dividers.length).toBe(1);

    expect(pageNavigations.length).toBe(4);
    expect(pageNavigations.at(0).prop('primaryText')).toEqual('Profile');
    expect(pageNavigations.at(0).prop('value')).toEqual(
      JSON.stringify({
        newRoute: '/account/profile',
        currentUserId: props.currentUserId,
        userIdToShow: props.currentUserId,
      }),
    );

    expect(pageNavigations.at(1).prop('primaryText')).toEqual('Unprotected');
    expect(pageNavigations.at(1).prop('value')).toEqual(
      JSON.stringify({
        newRoute: '/account/names/unprotected',
        currentUserId: props.currentUserId,
        userIdToShow: props.currentUserId,
      }),
    );

    expect(pageNavigations.at(2).prop('primaryText')).toEqual('Protected');
    expect(pageNavigations.at(2).prop('value')).toEqual(
      JSON.stringify({
        newRoute: `/account/names/${props.protectedListToShow}`,
        currentUserId: props.currentUserId,
        userIdToShow: props.currentUserId,
      }),
    );

    expect(pageNavigations.at(3).prop('primaryText')).toEqual('Clients');
    expect(pageNavigations.at(3).prop('value')).toEqual(
      JSON.stringify({
        newRoute: '/account/names/clients',
        currentUserId: props.currentUserId,
        userIdToShow: props.currentUserId,
      }),
    );
  });

  // it('does not render admin panel when is not admin', () => {
  //   const { wrapper } = setup({ isAdmin: false });
  //   expect(wrapper.find(AdminUserListWithData).exists()).toBeFalsy();
  // });

  // it(
  //   'renders admin panel with the correct props when is admin',
  //   () => {
  //   const handleRouteChange = jest.fn();
  //   const { wrapper, props } = setup({ isAdmin: true, handleRouteChange });

  //   const adminUserList = wrapper.find(AdminUserListWithData);
  //   expect(adminUserList.exists()).toBeTruthy();
  //   expect(adminUserList.prop('currentUserId')).toEqual(props.currentUserId);
  //   expect(adminUserList.prop('value')).toEqual(
  //     JSON.stringify({
  //       newRoute: props.currentPage,
  //       currentUserId: props.currentUserId,
  //     }),
  //   );

  //   const onRouteChange = adminUserList.prop('onChange');
  //   onRouteChange();
  //   expect(handleRouteChange).toHaveBeenCalled;
  // }),
});
