import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import { UnprotectedIcon, ProtectedIcon, ClientsIcon } from '../icons';

import { changeSideBarState } from '../../authentication/accountActions';
import AdminUserListWithData from './AdminUserListWithData';
import { changeShownUserProfile } from '../../profile/profileActions';

const SelectableList = makeSelectable(List);

export const SideBar = ({
  isAdmin,
  currentPage,
  protectedListToShow,
  currentUserId,
  profileUserId,
  handleRouteChange
}) => {
  const selectedValue = JSON.stringify({
    newRoute: currentPage,
    currentUserId,
    userIdToShow: profileUserId
  });

  return (
    <SelectableList value={selectedValue} onChange={handleRouteChange}>
      <ListItem
        primaryText="Profile"
        leftIcon={<AccountIcon />}
        value={JSON.stringify({
          newRoute: '/account/profile',
          currentUserId,
          userIdToShow: currentUserId
        })}
      />

      <Divider />

      <Subheader>Names</Subheader>
      <ListItem
        id="goToUnprotectedList"
        primaryText="Unprotected"
        leftIcon={<UnprotectedIcon />}
        value={JSON.stringify({
          newRoute: '/account/names/unprotected',
          currentUserId,
          userIdToShow: currentUserId
        })}
      />
      <ListItem
        id="goToProtectedList"
        primaryText="Protected"
        leftIcon={<ProtectedIcon />}
        value={JSON.stringify({
          newRoute: `/account/names/${protectedListToShow}`,
          currentUserId,
          userIdToShow: currentUserId
        })}
      />
      <ListItem
        id="goToClientsList"
        primaryText="Clients"
        leftIcon={<ClientsIcon />}
        value={JSON.stringify({
          newRoute: '/account/names/clients',
          currentUserId,
          userIdToShow: currentUserId
        })}
      />

      {isAdmin &&
        <AdminUserListWithData currentUserId={currentUserId} value={selectedValue} onChange={handleRouteChange} />}
    </SelectableList>
  );
};

const mapStateToProps = state => ({
  isAdmin: state.account.accountType === 'admin',
  currentPage: state.routing.location.pathname,
  currentUserId: state.account.id,
  profileUserId: state.profile.id,
  protectedListToShow: state.nameList.protectedListToShow
});

const mapDispatchToProps = dispatch => ({
  handleRouteChange: (event, linkValue) => {
    const { newRoute, currentUserId, userIdToShow } = JSON.parse(linkValue);
    dispatch(changeSideBarState(false));
    dispatch(push(newRoute));
    dispatch(
      changeShownUserProfile({
        currentUserId,
        userIdToShow,
        isNewUser: false
      })
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
