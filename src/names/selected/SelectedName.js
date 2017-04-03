import React from 'react';

import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import DeleteName from 'material-ui/svg-icons/action/delete';
import { red500 } from 'material-ui/styles/colors';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import NameDetails from './NameDetails';
import CompanyDetails from './CompanyDetails';

export default ({
  details: { name: { id, firstName, lastName, phone, company } },
  open, isProtected, children, closeNameDetails, removeNameAction
}) => (
  <Drawer containerStyle={{ zIndex: '1100' }} width={250} openSecondary open={open}>
    <div id="selectedName">
      <Toolbar>
        <ToolbarGroup firstChild>
          <IconButton onClick={closeNameDetails}>
            <NavigationClose />
          </IconButton>
        </ToolbarGroup>

        <ToolbarGroup>
          {children}
        </ToolbarGroup>

        <ToolbarGroup lastChild>
          <IconButton id="deleteName" touch onClick={removeNameAction}>
            <DeleteName color={red500} />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
      <List>
        <NameDetails isProtected={isProtected} name={{ id, firstName, lastName, phone }}/>
        <Divider />
        <CompanyDetails company={company} />
        <Divider />
      </List>
    </div>
  </Drawer>
);
