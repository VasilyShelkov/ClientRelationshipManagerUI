import React from 'react';
import { Field } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';

import Paper from 'material-ui/Paper';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { cyan500 } from 'material-ui/styles/colors';

import StandardForm from '../shared/StandardForm';
import { renderTextField, required, emailFormat, minLength, renderCheckbox } from '../shared/FormElements';
import LoadingSpinner from '../shared/LoadingSpinner';

export default ({ creatingUser, queryLoading, handleSubmit, error }) => (
  <div>
    {queryLoading
      ? <LoadingSpinner />
      : <Paper style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <PersonAddIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
            <h2>Add a new member to the team...</h2>
          </div>
          <StandardForm
            editingInProgress={creatingUser}
            fields={[
              <div className="col-12">
                <Field
                  key="newProfile__firstName"
                  name="firstName"
                  component={TextField}
                  floatingLabelText="First Name"
                  validate={required}
                  fullWidth
                />
              </div>,
              <div className="col-12">
                <Field
                  key="newProfile__lastName"
                  name="lastName"
                  component={TextField}
                  floatingLabelText="Last Name"
                  validate={required}
                  fullWidth
                />
              </div>,
              <div className="col-12">
                <Field
                  key="newProfile__email"
                  name="email"
                  component={TextField}
                  floatingLabelText="Email"
                  validate={[required, emailFormat]}
                  fullWidth
                />
              </div>,
              <div className="col-12">
                <Field
                  key="newProfile__phone"
                  name="phone"
                  component={TextField}
                  floatingLabelText="Phone"
                  validate={required}
                  fullWidth
                />
              </div>,
              <div className="col-12">
                <Field
                  key="newProfile__password"
                  name="password"
                  type="password"
                  component={TextField}
                  floatingLabelText="New Password"
                  validate={[required, minLength]}
                  fullWidth
                />
              </div>,
              <div className="col-12">
                <Field
                  key="newProfile__confirmPassword"
                  name="confirmPassword"
                  type="password"
                  component={TextField}
                  floatingLabelText="Confirm New Password"
                  validate={[required, minLength]}
                  fullWidth
                />
              </div>,
              <div className="col-12" style={{ margin: '20px 0px' }}>
                <Field key="newProfile__accountType" name="accountType" component={Checkbox} label="Administrator" />
              </div>
            ]}
            error={error}
            handleSubmit={handleSubmit}
          />
        </Paper>}
  </div>
);
