import React from 'react';
import AppBar from 'material-ui/AppBar';

import { NavBar } from './NavBar';

const setup = ({
  loggedIn = false,
  handleTouchTapLeftIconButton = () => '',
  handleLogOut = () => '',
}) => {
  const props = {
    loggedIn,
    handleTouchTapLeftIconButton,
    handleLogOut,
  };
  const wrapper = shallowWithContext(<NavBar {...props} />);

  return { wrapper, props };
};

describe('src/Navbar.js', () => {
  it('has a login button when the user is not logged in', () => {
    const { wrapper } = setup({});

    const appBarRightIcon = wrapper.find(AppBar).prop('iconElementRight').props
      .containerElement.props.to;
    expect(appBarRightIcon).toBe('/login');
  });

  it('shows the logout button when the user is logged in', () => {
    const handleLogOut = jest.fn();
    const { wrapper } = setup({ loggedIn: true, handleLogOut });

    const appBarRightIcon = wrapper.find(AppBar).prop('iconElementRight');
    appBarRightIcon.props.onClick();
    expect(handleLogOut).toHaveBeenCalled();
    expect(appBarRightIcon.props.label).toBe('Logout');
  });

  it('show icon button is not visible when the screen is large', () => {
    const { wrapper } = setup({ width: 'large' });

    expect(wrapper.find(AppBar).prop('showMenuIconButton')).toBe(false);
  });

  it('show icon button is not visible when not logged in', () => {
    const { wrapper } = setup({ loggedIn: false });

    expect(wrapper.find(AppBar).prop('showMenuIconButton')).toBe(false);
  });

  it('show icon button is visible when the screen is not large and logged in', () => {
    const { wrapper } = setup({ width: 'small', loggedIn: true });

    expect(wrapper.find(AppBar).prop('showMenuIconButton')).toBe(true);
  });

  it('passes handleTouchTapLeftIconButton props correctly', () => {
    const handleTouchTapLeftIconButton = jest.fn();
    const { wrapper } = setup({ handleTouchTapLeftIconButton });

    const appBar = wrapper.find(AppBar);
    appBar.prop('onLeftIconButtonTouchTap')();
    expect(handleTouchTapLeftIconButton).toHaveBeenCalled();
  });
});
