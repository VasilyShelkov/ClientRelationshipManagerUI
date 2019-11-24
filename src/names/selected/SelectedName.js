import React from 'react';
import { Switch, Route } from 'react-router';

import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import SelectedUnprotectedActionsWithData from './toolbarActions/unprotected/SelectedUnprotectedActionsWithData';
import SelectedProtectedActionsWithData from './toolbarActions/protected/SelectedProtectedActionsWithData';
import SelectedClientActionsWithData from './toolbarActions/client/SelectedClientActionsWithData';
import RemoveUnprotectedNameButton from './toolbarActions/unprotected/RemoveUnprotectedNameButton';
import RemoveProtectedNameButton from './toolbarActions/protected/RemoveProtectedNameButton';
import RemoveClientButton from './toolbarActions/client/RemoveClientButton';
import NameDetails from './NameDetails';
import CompanyDetails from './CompanyDetails';
import Comments from './comments/CommentsWithData';
import LoadingSpinner from '../../shared/LoadingSpinner';

const DRAWER_WIDTH = 250;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  toolbar: theme.mixins.toolbar,
}));
export default ({
  name,
  match: {
    params: { nameListType },
  },
  closeNameDetails,
}) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={Boolean(name)}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      {name ? (
        <div id="selectedName">
          <Toolbar>
            <ToolbarGroup firstChild>
              <IconButton onClick={() => closeNameDetails(nameListType)}>
                <NavigationClose />
              </IconButton>
            </ToolbarGroup>

            <Switch>
              <Route
                path="/account/names/unprotected"
                render={() => (
                  <SelectedUnprotectedActionsWithData name={name} />
                )}
              />
              <Route
                path="/account/names/(protected|metWithProtected)"
                render={() => <SelectedProtectedActionsWithData name={name} />}
              />
              <Route
                path="/account/names/clients"
                render={() => <SelectedClientActionsWithData name={name} />}
              />
            </Switch>

            <ToolbarGroup lastChild>
              <Switch>
                <Route
                  path={`/account/names/unprotected`}
                  render={() => <RemoveUnprotectedNameButton name={name} />}
                />
                <Route
                  path={`/account/names/(protected|metWithProtected)`}
                  render={() => <RemoveProtectedNameButton name={name} />}
                />
                <Route
                  path={`/account/names/clients`}
                  render={() => <RemoveClientButton name={name} />}
                />
              </Switch>
            </ToolbarGroup>
          </Toolbar>
          <List>
            <NameDetails
              isProtected={
                nameListType === 'protected' ||
                nameListType === 'metWithProtected' ||
                nameListType === 'client'
              }
              name={{
                id: name.id,
                firstName: name.firstName,
                lastName: name.lastName,
                phone: name.phone,
              }}
            />
            <Divider />
            <CompanyDetails company={name.company} />
            <Divider />
            <Comments
              id={name.id}
              firstName={name.firstName}
              lastName={name.lastName}
            />
          </List>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </Drawer>
  );
};
