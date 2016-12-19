import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';

const Navbar = ({ loggedIn }) => {
  const isMobile = window.width < 768;
  return (
    <AppBar
      title="Client Relationship Manager"
      className="NavBar"
      zDepth={2}
      showMenuIconButton={isMobile}
      style={{ position: 'fixed', top: 0 }}
      iconElementRight={
        loggedIn ?
          <Link to="/">
            <IconButton touch ><AccountIcon /></IconButton>
          </Link>
        :
          <FlatButton
            containerElement={<Link to="/login" />}
            label="Login"
            primary
          />
      }
    />
  );
};

const mapStateToProps = state => ({
  loggedIn: state.account.token
});

export default connect(mapStateToProps)(Navbar);
