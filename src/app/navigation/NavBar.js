import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import LogoutIcon from 'material-ui/svg-icons/maps/directions-run';

import { toggleSideBar, logOut } from '../../authentication/accountActions';

export const NavBar = ({
  loggedIn,
  width,
  handleTouchTapLeftIconButton,
  handleLogOut,
}) => (
  <AppBar
    className="NavBar"
    zDepth={2}
    showMenuIconButton={Boolean(!(width === LARGE) && loggedIn)}
    onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
    style={{ position: 'fixed', top: 0 }}
    iconElementRight={
      loggedIn ? (
        <FlatButton
          label="Logout"
          onClick={handleLogOut}
          icon={<LogoutIcon />}
          secondary
        />
      ) : (
        <FlatButton
          label="Login"
          containerElement={<Link to="/login" />}
          primary
        />
      )
    }
  />
);

const NavBarWithDeviceWidth = withWidth()(NavBar);

const mapStateToProps = state => ({
  loggedIn: state.account.token,
});

const mapDispatchToProps = dispatch => ({
  handleTouchTapLeftIconButton: () => dispatch(toggleSideBar()),
  handleLogOut: () => {
    dispatch(push('/'));
    dispatch(logOut());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBarWithDeviceWidth);
