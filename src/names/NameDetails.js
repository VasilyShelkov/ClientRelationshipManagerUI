import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import DeleteName from 'material-ui/svg-icons/action/delete';
import { red500, cyan500 } from 'material-ui/styles/colors';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { closeNameDetailsDrawer } from './nameActions';

export const NameDetailsDrawer = ({
  details: { name: { firstName, lastName, phone, company } },
  open,
  children,
  closeNameDetails,
  removeNameAction
}) => (
  <Drawer containerStyle={{ zIndex: '1100' }} width={300} openSecondary open={open}>
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
        <IconButton touch onClick={removeNameAction}>
          <DeleteName color={red500} />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>
    <List>
      <ListItem
        primaryText={`${firstName} ${lastName}`}
        rightIcon={<EditIcon color={cyan500} />}
      />
      <ListItem primaryText={phone} leftIcon={<PhoneIcon />} disabled />

      <Divider />

      <Subheader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Company <EditIcon color={cyan500} />
      </Subheader>
      <ListItem primaryText={company.name} disabled />
      <ListItem primaryText={company.phone} leftIcon={<PhoneIcon />} disabled />
      <ListItem primaryText={company.address} leftIcon={<LocationIcon />} disabled />
      <Divider />
    </List>
  </Drawer>
);

const mapDispatchToProps = dispatch => ({
  closeNameDetails: () => dispatch(closeNameDetailsDrawer())
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(NameDetailsDrawer);
