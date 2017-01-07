import React from 'react';
import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import NavBar from './NavBar';

describe('src/Navbar.js', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('has a login button when the user is not logged in', () => {
    const wrapper = shallowWithContext(<NavBar />);
    const appBarRightIcon = wrapper.find(AppBar).prop('iconElementRight').props.containerElement.props.to;
    expect(appBarRightIcon).to.equal('/login');
  });

  it('shows the profile button when the user is logged in', () => {
    const wrapper = shallowWithContext(<NavBar loggedIn />);
    const appBarRightIcon = wrapper.find(AppBar).prop('iconElementRight').props.containerElement.props.to;
    expect(appBarRightIcon).to.equal('/account/profile');
  });
});
