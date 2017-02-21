import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { AutoComplete, TextField } from 'redux-form-material-ui';

import { AutoComplete as MUIAutoComplete } from 'material-ui';
import Paper from 'material-ui/Paper';
import StandardForm from '../../../shared/StandardForm';
import { required, AddressField } from '../../../shared/FormElements';

export const AddUnprotectedName = ({
  creatingUnprotectedName, handleSubmit, cancelCreateName, error
}) => (
  <div>
    <Paper style={{ marginTop: '20px' }}>
      <StandardForm
        editingInProgress={creatingUnprotectedName}
        error={error}
        handleSubmit={handleSubmit}
        handleCancel={cancelCreateName}
        fields={[
          <div key="unprotectedName__details" className="col-12 col-sm-6">
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
          <div key="unprotectedName__company" className="col-12 col-sm-6">
            <h3>Company</h3>
            <div className="row">
              <div className="col-12">
                <Field
                  name="companyName"
                  component={AutoComplete}
                  floatingLabelText="Company Name"
                  openOnFocus
                  filter={MUIAutoComplete.fuzzyFilter}
                  onNewRequest={companyName => {
                    console.log(companyName);
                  }}
                  dataSource={[]}
                  maxSearchResults={10}
                  fullWidth
                />
              </div>
              <div className="col-12">
                <Field
                  name="companyAddress"
                  component={AddressField}
                  floatingLabelText="Company Address"
                  validate={required}
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

export default reduxForm({ form: 'newName' })(AddUnprotectedName);
