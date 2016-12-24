import React from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';

export default ({ loggedIn }) => {
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
          <IconButton
            containerElement={<Link to="/profile" />}
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
  );
};
