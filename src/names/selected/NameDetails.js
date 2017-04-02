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
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import Divider from 'material-ui/Divider';

import {
  showEditName, hideEditName, showEditNameCompany, hideEditNameCompany
} from './selectedActions';
import EditNameForm from '../edit/EditSelectedNameForm';
import EditNameCompanyForm from '../edit/EditNameCompanyForm';

export const NameDetails = ({
  userId, details: { name: { id, firstName, lastName, phone, company } },
  open, showingEditNameForm, showingEditCompanyForm, isProtected, children,
  closeNameDetails, removeNameAction, showEditNameForm, hideEditNameForm,
  showEditCompanyForm, hideEditCompanyForm
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
        {
          showingEditNameForm ?
            <div>
              <Subheader>Editing Name</Subheader>
              <EditNameForm
                userId={userId}
                initialValues={{ id, firstName, lastName, phone }}
                cancelEditName={hideEditNameForm}
                isProtected={isProtected}
              />
            </div>
          :
            <div>
              <Subheader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Name
                <IconButton>
                  <EditIcon id="editName" onClick={showEditNameForm} color={cyan500} />
                </IconButton>
              </Subheader>
              <ListItem primaryText={`${firstName} ${lastName}`} disabled />
              <ListItem primaryText={phone} leftIcon={<PhoneIcon />} disabled />
            </div>
        }

        <Divider />

        {
          showingEditCompanyForm ?
            <div>
              <Subheader>Editing Company</Subheader>
              <EditNameCompanyForm
                userId={userId}
                initialValues={company}
                cancelEditNameCompany={hideEditCompanyForm}
              />
            </div>
          :
            <div>
              <Subheader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Company
                <IconButton>
                  <EditIcon id="editCompany" onClick={showEditCompanyForm} color={cyan500} />
                </IconButton>
              </Subheader>
              <ListItem primaryText={company.name} disabled />
              <ListItem primaryText={company.phone} leftIcon={<PhoneIcon />} disabled />
              <ListItem primaryText={company.address} leftIcon={<LocationIcon />} disabled />
            </div>
        }

        <Divider />
      </List>
    </div>
  </Drawer>
);

const mapStateToProps = state => ({
  userId: state.account.id,
  showingEditNameForm: state.selectedName.showingEditNameForm,
  showingEditCompanyForm: state.selectedName.showingEditNameCompanyForm
});

const mapDispatchToProps = dispatch => ({
  showEditNameForm: () => dispatch(showEditName()),
  hideEditNameForm: () => dispatch(hideEditName()),
  showEditCompanyForm: () => dispatch(showEditNameCompany()),
  hideEditCompanyForm: () => dispatch(hideEditNameCompany())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameDetails);

