import React from 'react';
import _ from 'lodash';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { cyan500 } from 'material-ui/styles/colors';
import LoadingSpinner from '../../shared/LoadingSpinner';

const SelectableList = makeSelectable(List);

export default ({ currentUserId, loading, users, value, onChange }) => {
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
        value={JSON.stringify({
          newRoute: '/account/users/add',
          currentUserId,
          userIdToShow: currentUserId
        })}
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
                currentUserId,
                userIdToShow: user.id
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

