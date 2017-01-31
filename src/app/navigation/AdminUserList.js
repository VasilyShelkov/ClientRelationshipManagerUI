import React from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { cyan500 } from 'material-ui/styles/colors';

import GetAllUsers from './GetAllUsers.gql';
import LoadingSpinner from '../../shared/LoadingSpinner';

const SelectableList = makeSelectable(List);

export const AdminUserList = ({ loading, users, value, onChange }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SelectableList value={value} onChange={onChange}>
      <Divider />

      <ListItem
        primaryText="Create New User"
        rightAvatar={
          <Avatar icon={<PersonAddIcon />} backgroundColor={cyan500} />
        }
        value="/account/users/add"
      />

      <Divider />

      <Subheader>{users.length} Users</Subheader>
      {
        users.length ?
          users.map(user =>
            <ListItem
              key={`profile-${user.id}`}
              primaryText={`${user.firstName} ${user.lastName}`}
              value={JSON.stringify({
                newRoute: `/account/users/${_.camelCase(`${user.firstName} ${user.lastName}`)}/profile`,
                id: user.id
              })}
              insetChildren
            />
          )
        :
          <ListItem
            secondaryText="There are no other users..."
            disabled
          />
      }
    </SelectableList>
  );
};

export default graphql(GetAllUsers, {
  props: ({ ownProps, data: { loading, users } }) => {
    let usersWithoutSelf = [];
    if (!loading) {
      usersWithoutSelf = users.filter(
        user => user.id !== ownProps.currentUserId
      );
    }

    return { loading, users: usersWithoutSelf, ...ownProps };
  }
})(AdminUserList);
