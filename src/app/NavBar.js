import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import { toggleSideBar } from '../authentication/accountActions';

export const NavBar = ({ loggedIn, width, handleTouchTapLeftIconButton }) => (
  <div style={width === LARGE ? { paddingLeft: 256 } : {}}>
    <AppBar
      title="Client Relationship Manager"
      className="NavBar"
      zDepth={2}
      showMenuIconButton={!(width === LARGE)}
      onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
      style={{ position: 'fixed', top: 0 }}
      iconElementRight={
        loggedIn ?
          <IconButton
            containerElement={<Link to="/account/profile" />}
            touch
          >
            <AccountIcon />
          </IconButton>
        :
          <FlatButton
            containerElement={<Link to="/login" />}
            label="Login"
            primary
          />
      }
    />
  </div>
);

const NavBarWithDeviceWidth = withWidth()(NavBar);

const mapStateToProps = state => ({
  loggedIn: state.account.token
});

const mapDispatchToProps = dispatch => ({
  handleTouchTapLeftIconButton: () => dispatch(toggleSideBar())
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(NavBarWithDeviceWidth);
