import * as React from 'react';
import { connect } from 'react-redux';

import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';

import { State } from '../../rootReducer';
import { UnprotectedIcon, ProtectedIcon, ClientsIcon } from '../icons';
import { ProfileLink, UnprotectedListLink, ClientListLink } from './Links';
// import AdminUserListWithData from './AdminUserListWithData';

interface Props {
  isAdmin: boolean;
  currentPage: string;
  // protectedListToShow: 'protected' | 'metWithProtected';
  currentUserId: string;
  profileUserId: string;
}
export const SideBar = ({
  isAdmin,
  currentPage,
  // protectedListToShow,
  currentUserId,
  profileUserId,
}: Props) => {
  // const selectedValue = JSON.stringify({
  //   newRoute: currentPage,
  //   currentUserId,
  //   userIdToShow: profileUserId,
  // });

  return (
    <List>
      <ListItem button={true} component={ProfileLink}>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText inset primary="Profile" />
      </ListItem>

      <Divider />

      <ListSubheader>Names</ListSubheader>

      <ListItem
        button={true}
        id="goToUnprotectedList"
        component={UnprotectedListLink}
      >
        <ListItemIcon>
          <UnprotectedIcon />
        </ListItemIcon>
        <ListItemText inset primary="Unprotected" />
      </ListItem>

      {/* <ListItem
        button={true}
        id="goToProtectedList"
        value={JSON.stringify({
          newRoute: `/account/names/${protectedListToShow}`,
          currentUserId,
          userIdToShow: currentUserId,
        })}
      >
        <ListItemIcon>
          <ProtectedIcon />
        </ListItemIcon>
        <ListItemText inset primary="Protected" />
      </ListItem> */}

      <ListItem button={true} id="goToClientsList" component={ClientListLink}>
        <ListItemIcon>
          <ClientsIcon />
        </ListItemIcon>
        <ListItemText inset primary="Clients" />
      </ListItem>

      {/* {isAdmin && (
        <AdminUserListWithData
          currentUserId={currentUserId}
          value={selectedValue}
        />
      )} */}
    </List>
  );
};

const mapStateToProps = (state: State) => ({
  isAdmin: state.account.accountType === 'admin',
  currentPage: state.routing.location.pathname,
  currentUserId: state.account.userId,
  profileUserId: state.profile.userId,
  // protectedListToShow: state.nameList.protectedListToShow,
});

export default connect(mapStateToProps)(SideBar);
