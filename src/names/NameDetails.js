import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import DeleteName from 'material-ui/svg-icons/action/delete';
import { red500 } from 'material-ui/styles/colors';

import { closeNameDetailsDrawer } from './nameActions';

export const NameDetailsDrawer = ({
  details: { name: { firstName, lastName, phone, company }, created_at },
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
    <div style={{ paddingLeft: '15px' }}>
      <div>
        <h1>{firstName} {lastName}</h1>
        <h2>{phone}</h2>
      </div>
      <div>
        <h1>Company</h1>
        <h2>{company.name}</h2>
        <h2>{company.phone}</h2>
        <h2>{company.address}</h2>
      </div>
    </div>
  </Drawer>
);

const mapDispatchToProps = dispatch => ({
  closeNameDetails: () => dispatch(closeNameDetailsDrawer())
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(NameDetailsDrawer);
