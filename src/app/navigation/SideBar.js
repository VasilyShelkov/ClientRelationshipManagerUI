import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Drawer from 'material-ui/Drawer';
import { LARGE } from 'material-ui/utils/withWidth';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import ClientsIcon from 'material-ui/svg-icons/social/group';

import { changeSideBarState } from '../../authentication/accountActions';
import AdminUserListWithData from './AdminUserListWithData';
import { changeShownUserProfile } from '../../profile/profileActions';

const SelectableList = makeSelectable(List);

export const SideBar = ({
  isAdmin,
  open,
  width,
  currentPage,
  currentUserId,
  profiileUserId,
  handleChangeRequestSideBar,
  handleRouteChange
}) => {
  const selectedValue = JSON.stringify({
    newRoute: currentPage,
    currentUserId,
    userIdToShow: profiileUserId
  });
  return (
    <Drawer docked={width === LARGE} open={open || width === LARGE} onRequestChange={handleChangeRequestSideBar}>
      <div>
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
            primaryText="Unprotected"
            leftIcon={<LockOpenIcon />}
            value={JSON.stringify({
              newRoute: '/account/names/unprotected',
              currentUserId,
              userIdToShow: currentUserId
            })}
          />
          <ListItem
            primaryText="Protected"
            leftIcon={<LockClosedIcon />}
            value={JSON.stringify({
              newRoute: '/account/names/protected',
              currentUserId,
              userIdToShow: currentUserId
            })}
          />
          <ListItem
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
      </div>
    </Drawer>
  );
};

const mapStateToProps = state => ({
  isAdmin: state.account.accountType === 'admin',
  open: state.account.sideBarOpen,
  currentPage: state.routing.locationBeforeTransitions.pathname,
  currentUserId: state.account.id,
  profiileUserId: state.profile.id
});

const mapDispatchToProps = dispatch => ({
  handleChangeRequestSideBar: open => dispatch(changeSideBarState(open)),
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
