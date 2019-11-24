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
import { changeShownUserProfile } from '../profile/profileActions';

const useStyles = makeStyles(theme => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
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
  showCurrentProfile,
  currentUserId,
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
    <AppBar data-testid="appbar" position="sticky" className={styles.appBar}>
      <Toolbar>
        {isMobile ? (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        ) : (
          <ButtonGroup size="large" variant="text" fullWidth={true}>
            <Button
              id="goToUnprotectedList"
              className={getLinkClass(currentPath.includes(UNPROTECTED_URL))}
              onClick={() => navigateTo(UNPROTECTED_URL)}
              startIcon={<LockOpenIcon />}
            >
              Unprotected
            </Button>
            <Button
              id="goToProtectedList"
              className={getLinkClass(currentPath.includes(protectedUrl))}
              onClick={() => navigateTo(protectedUrl)}
              startIcon={<LockIcon />}
            >
              Protected
            </Button>

            <Button
              id="goToClientsList"
              startIcon={<BusinessCenterIcon />}
              className={getLinkClass(currentPath.includes(CLIENTS_URL))}
              onClick={() => navigateTo(CLIENTS_URL)}
            >
              Clients
            </Button>
            {isAdmin ? (
              <Button
                id="goToUsers"
                startIcon={<PeopleOutlineIcon />}
                className={getLinkClass(currentPath.includes(USERS_URL))}
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
              showCurrentProfile(currentUserId);
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
  currentUserId: state.account.id,
});

const mapDispatchToProps = dispatch => ({
  showCurrentProfile: currentUserId =>
    dispatch(
      changeShownUserProfile({
        currentUserId,
        userIdToShow: currentUserId,
      }),
    ),
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
