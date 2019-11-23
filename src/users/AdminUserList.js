import React from 'react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { green500 } from 'material-ui/styles/colors';
import toMaterialStyle from 'material-color-hash';
import LoadingSpinner from '../shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ({ currentUserId, loading, users, value, onChange }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <span id="totalUserCount">{users.length}</span> Users
          </ListSubheader>
        }
      >
        <ListItem
          id="createNewUser"
          button
          selected={false}
          value={JSON.stringify({
            // changeME
            newRoute: '/account/users/add',
            currentUserId,
            userIdToShow: currentUserId,
          })}
          onClick={event => {}}
        >
          <ListItemIcon>
            <Avatar icon={<PersonAddIcon />} backgroundColor={green500} />
          </ListItemIcon>
          <ListItemText primary="Create New User" />
        </ListItem>

        <Divider />

        {users.length ? (
          users.map(user => (
            <ListItem
              key={`profile-${user.id}`}
              button
              value={JSON.stringify({
                // CHANGEME
                newRoute: `/account/users/${_.camelCase(
                  `${user.firstName} ${user.lastName}`,
                )}/profile`,
                currentUserId,
                userIdToShow: user.id,
              })}
              selected={false}
              onClick={event => {}}
            >
              <ListItemIcon>
                <Avatar
                  style={toMaterialStyle(
                    user.firstName[0].toUpperCase() +
                      user.lastName[0].toUpperCase(),
                  )}
                >
                  {user.firstName[0].toUpperCase()}
                  {user.lastName[0].toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            </ListItem>
          ))
        ) : (
          <ListItem disabled>
            <ListItemText primary="There are no other users..." />
          </ListItem>
        )}
      </List>
    </div>
  );
};
