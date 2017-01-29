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
import AdminUserListWithData from './AdminUserList';

const SelectableList = makeSelectable(List);

export const SideBar = ({
  isAdmin, open, width, currentPage, currentUserId,
  handleChangeRequestSideBar, handleRouteChange
}) => (
  <Drawer
    docked={width === LARGE}
    open={open || width === LARGE}
    onRequestChange={handleChangeRequestSideBar}
  >
    <div>
      <SelectableList value={currentPage} onChange={handleRouteChange}>
        <ListItem
          primaryText="Profile"
          leftIcon={<AccountIcon />}
          value="/account/profile"
        />

        <Divider />

        <Subheader>Names</Subheader>
        <ListItem
          primaryText="Unprotected"
          leftIcon={<LockOpenIcon />}
          value="/account/names/unprotected"
        />
        <ListItem
          primaryText="Protected"
          leftIcon={<LockClosedIcon />}
          value="/account/names/protected"
        />
        <ListItem
          primaryText="Clients"
          leftIcon={<ClientsIcon />}
          value="/account/names/clients"
        />

        {
          isAdmin &&
            <AdminUserListWithData
              currentUserId={currentUserId}
              value={currentPage}
              onChange={handleRouteChange}
            />
        }
      </SelectableList>
    </div>
  </Drawer>
);

const mapStateToProps = state => ({
  isAdmin: state.account.accountType === 'admin',
  open: state.account.sideBarOpen,
  currentPage: state.routing.locationBeforeTransitions.pathname,
  currentUserId: state.account.id,
});

const mapDispatchToProps = dispatch => ({
  handleChangeRequestSideBar: open => dispatch(changeSideBarState(open)),
  handleRouteChange: (event, newRoute) => {
    dispatch(changeSideBarState(false));
    dispatch(push(newRoute));
  },
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SideBar);
