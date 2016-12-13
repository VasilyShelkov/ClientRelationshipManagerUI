import React from 'react';
import { Link } from 'react-router';
import Cookies from 'js-cookie';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';

export default () => {
  const isMobile = window.width < 768;
  const loggedIn = Cookies.get('CrmSSO');
  return (
    <AppBar
      title="Client Relationship Manager"
      className="NavBar"
      zDepth={2}
      showMenuIconButton={isMobile}
      style={{ position: 'fixed', top: 0}}
      iconElementRight={
        loggedIn ?
          <Link to="/profile">
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
