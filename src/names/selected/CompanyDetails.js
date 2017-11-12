import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { cyan500 } from 'material-ui/styles/colors';

import { showEditNameCompany, hideEditNameCompany } from './selectedActions';
import EditNameCompanyForm from './edit/EditNameCompanyForm';

export const CompanyDetails = ({
  userId,
  company,
  showingEditCompanyForm,
  isProtected,
  showEditCompanyForm,
  hideEditCompanyForm,
}) =>
  showingEditCompanyForm ? (
    <div>
      <Subheader>Editing Company</Subheader>
      <EditNameCompanyForm
        userId={userId}
        initialValues={company}
        cancelEditNameCompany={hideEditCompanyForm}
      />
    </div>
  ) : (
    <div>
      <Subheader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Company
        <IconButton>
          <EditIcon
            id="editCompany"
            onClick={showEditCompanyForm}
            color={cyan500}
          />
        </IconButton>
      </Subheader>
      <ListItem primaryText={company.name} disabled />
      <ListItem primaryText={company.phone} leftIcon={<PhoneIcon />} disabled />
      <ListItem
        primaryText={company.address}
        leftIcon={<LocationIcon />}
        disabled
      />
    </div>
  );

const mapStateToProps = state => ({
  userId: state.account.id,
  showingEditCompanyForm: state.selectedName.showingEditNameCompanyForm,
});

const mapDispatchToProps = dispatch => ({
  showEditCompanyForm: () => dispatch(showEditNameCompany()),
  hideEditCompanyForm: () => dispatch(hideEditNameCompany()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
