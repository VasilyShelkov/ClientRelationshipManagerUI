import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { AutoComplete, TextField } from 'redux-form-material-ui';

import { AutoComplete as MUIAutoComplete } from 'material-ui';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import StandardForm from '../../../shared/StandardForm';
import { required, AddressField } from '../../../shared/FormElements';

export const AddUnprotectedName = ({
  existingCompanies, loading, error, nameDetailsDrawerOpen,
  handleSubmit, cancelCreateName, change
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Paper style={{ marginTop: '20px' }}>
        <StandardForm
          error={error}
          handleSubmit={handleSubmit}
          handleCancel={cancelCreateName}
          fields={[
            <div key="unprotectedName__details" className={`col-12 col-${nameDetailsDrawerOpen ? 'md' : 'sm'}-6`}>
              <h3>Name</h3>
              <div className="row">
                <div className="col-12">
                  <Field
                    name="firstName"
                    component={TextField}
                    floatingLabelText="First Name"
                    validate={required}
                    fullWidth
                  />
                </div>
                <div className="col-12">
                  <Field
                    name="lastName"
                    component={TextField}
                    floatingLabelText="Last Name"
                    validate={required}
                    fullWidth
                  />
                </div>
                <div className="col-12">
                  <Field
                    name="phone"
                    component={TextField}
                    floatingLabelText="Phone"
                    validate={required}
                    fullWidth
                  />
                </div>
              </div>
            </div>,
            <div key="unprotectedName__company" className={`col-12 col-${nameDetailsDrawerOpen ? 'md' : 'sm'}-6`}>
              <h3>Company</h3>
              <div className="row">
                <div className="col-12">
                  <Field
                    name="companyName"
                    component={AutoComplete}
                    floatingLabelText="Company Name"
                    openOnFocus
                    filter={MUIAutoComplete.fuzzyFilter}
                    onNewRequest={(companyName) => {
                      const companyInfo = existingCompanies.find(
                        company => company.name === companyName
                      );

                      change('companyAddress', companyInfo.address);
                      change('companyPhone', companyInfo.phone);
                    }}
                    dataSource={existingCompanies.map(info => info.name)}
                    maxSearchResults={10}
                    validate={required}
                    fullWidth
                  />
                </div>
                <div className="col-12">
                  <Field
                    name="companyAddress"
                    component={AddressField}
                    floatingLabelText="Company Address"
                    fullWidth
                  />
                </div>
                <div className="col-12">
                  <Field
                    name="companyPhone"
                    component={TextField}
                    floatingLabelText="Company Phone"
                    validate={required}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          ]}
        />
      </Paper>
    </div>
  );
};

export default reduxForm({ form: 'newName' })(AddUnprotectedName);
