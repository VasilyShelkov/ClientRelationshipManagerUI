import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Drawer from 'material-ui/Drawer';
import { LARGE } from 'material-ui/utils/withWidth';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import LockClosedIcon from 'material-ui/svg-icons/action/lock-outline';
import ClientsIcon from 'material-ui/svg-icons/social/group';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { cyan500 } from 'material-ui/styles/colors';

import { changeSideBarState } from '../../authentication/accountActions';

const SelectableList = makeSelectable(List);

const SideBar = ({
  users = [], loading, isAdmin, open, width, currentPage,
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

        {isAdmin && <Divider />}
        {isAdmin && <Subheader>{users.length} Users</Subheader>}
        {isAdmin &&
          <ListItem
            primaryText="Create User"
            rightAvatar={
              <Avatar icon={<PersonAddIcon />} backgroundColor={cyan500} />
            }
            value="/account/users/add"
          />
        }
        {
          isAdmin && users.map(user =>
            <ListItem
              primaryText={`${user.firstName} ${user.lastName}`}
              value="/get-started/required-knowledge"
            />
          )
        }
      </SelectableList>
    </div>
  </Drawer>
);

const adminData = gql`
  query {
    users {
      id
      firstName,
      lastName,
      created_at,
    }
  }
`;

const SideBarWithData = (props) => {
  const { isAdmin } = props;
  if (isAdmin) {
    return graphql(adminData, {
      props: ({ ownProps, data: { loading, users } }) => ({
        loading,
        users,
        ...ownProps
      })
    })(SideBar);
  }

  return <SideBar {...props} />;
};

const mapStateToProps = state => ({
  isAdmin: state.account.accountType === 'admin',
  open: state.account.sideBarOpen,
  currentPage: state.routing.locationBeforeTransitions.pathname
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
)(SideBarWithData);
