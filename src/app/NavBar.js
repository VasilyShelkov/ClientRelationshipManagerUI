import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

import { logOut } from '../authentication/accountActions';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => {
  return {
    link: {
      color: 'white',
    },
    activeLink: {
      color: theme.palette.secondary.main,
    },
  };
});

const UNPROTECTED_URL = '/account/names/unprotected';
const CLIENTS_URL = '/account/names/clients';
const USERS_URL = '/account/users';
const Navbar = ({
  isAdmin,
  navigateTo,
  currentPath,
  handleLogOut,
  protectedListToShow,
}) => {
  const protectedUrl = `/account/names/${protectedListToShow}`;
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const closeAccountMenu = () => setAnchorEl(null);
  const isMobile = useMediaQuery('(max-width:300px)');
  const getLinkClass = isActive => (isActive ? styles.activeLink : styles.link);

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        ) : (
          <ButtonGroup size="large" variant="text" fullWidth={true}>
            <Button
              className={getLinkClass(currentPath === UNPROTECTED_URL)}
              onClick={() => navigateTo(UNPROTECTED_URL)}
              startIcon={<LockOpenIcon />}
            >
              Unprotected
            </Button>
            <Button
              className={getLinkClass(currentPath === protectedUrl)}
              onClick={() => navigateTo(protectedUrl)}
              startIcon={<LockIcon />}
            >
              Protected
            </Button>

            <Button
              startIcon={<BusinessCenterIcon />}
              className={getLinkClass(currentPath === CLIENTS_URL)}
              onClick={() => navigateTo(CLIENTS_URL)}
            >
              Clients
            </Button>
            {isAdmin ? (
              <Button
                startIcon={<PeopleOutlineIcon />}
                className={getLinkClass(currentPath === USERS_URL)}
                onClick={() => navigateTo(USERS_URL)}
              >
                Users
              </Button>
            ) : null}
          </ButtonGroup>
        )}

        <IconButton
          data-testid="account-menu"
          onClick={e => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeAccountMenu}
        >
          <MenuItem
            onClick={() => {
              closeAccountMenu();
              navigateTo('/account/profile');
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeAccountMenu();
              handleLogOut();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  currentPath: state.routing.location.pathname,
  isAdmin: state.account.accountType === 'admin',
  protectedListToShow: state.nameList.protectedListToShow,
});

const mapDispatchToProps = dispatch => ({
  handleLogOut: () => {
    dispatch(push('/'));
    dispatch(logOut());
  },
  navigateTo: path => dispatch(push(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
