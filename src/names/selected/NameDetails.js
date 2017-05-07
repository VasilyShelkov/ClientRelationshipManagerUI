import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { cyan500 } from 'material-ui/styles/colors';

import { showEditName, hideEditName } from './selectedActions';
import EditNameForm from './edit/EditSelectedNameForm';

export const NameDetails = ({ userId, name, showingEditNameForm, isProtected, showEditNameForm, hideEditNameForm }) =>
  showingEditNameForm
    ? <div>
        <Subheader>Editing Name</Subheader>
        <EditNameForm
          userId={userId}
          initialValues={name}
          cancelEditName={hideEditNameForm}
          isProtected={isProtected}
        />
      </div>
    : <div>
        <Subheader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Name
          <IconButton>
            <EditIcon id="editName" onClick={showEditNameForm} color={cyan500} />
          </IconButton>
        </Subheader>
        <ListItem primaryText={`${name.firstName} ${name.lastName}`} disabled />
        <ListItem primaryText={name.phone} leftIcon={<PhoneIcon />} disabled />
      </div>;

const mapStateToProps = state => ({
  userId: state.account.id,
  showingEditNameForm: state.selectedName.showingEditNameForm
});

const mapDispatchToProps = dispatch => ({
  showEditNameForm: () => dispatch(showEditName()),
  hideEditNameForm: () => dispatch(hideEditName())
});

export default connect(mapStateToProps, mapDispatchToProps)(NameDetails);
