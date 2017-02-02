import React from 'react';
import { Field } from 'redux-form';

import Paper from 'material-ui/Paper';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { cyan500 } from 'material-ui/styles/colors';

import CreateUser from './CreateUser.gql';
import GetUserCompany from './GetUserCompany.gql';
import StandardForm from '../shared/StandardForm';
import {
  renderTextField, required, emailFormat, minLength
} from '../shared/FormElements';
import LoadingSpinner from '../shared/LoadingSpinner';

export default ({ creatingUser, queryLoading, handleSubmit, error }) => (
  <div>
    {
      queryLoading ?
        <LoadingSpinner />
      :
        <Paper style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <PersonAddIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
            <h2>Add a new member to the team...</h2>
          </div>
          <StandardForm
            editingInProgress={creatingUser}
            fields={[
              <Field
                key="newProfile__firstName"
                name="firstName"
                component={renderTextField}
                label="First name"
                validate={required}
                fullWidth
              />,
              <Field
                key="newProfile__lastName"
                name="lastName"
                component={renderTextField}
                label="Last Name"
                validate={required}
                fullWidth
              />,
              <Field
                key="newProfile__email"
                name="email"
                component={renderTextField}
                label="Email"
                validate={[required, emailFormat]}
                fullWidth
              />,
              <Field
                key="newProfile__phone"
                name="phone"
                component={renderTextField}
                label="Phone"
                validate={required}
                fullWidth
              />,
              <Field
                key="newProfile__password"
                name="password"
                type="password"
                component={renderTextField}
                label="New Password"
                validate={[required, minLength]}
                fullWidth
              />,
              <Field
                key="newProfile__confirmPassword"
                name="confirmPassword"
                type="password"
                component={renderTextField}
                label="Confirm New Password"
                validate={[required, minLength]}
                fullWidth
              />
            ]}
            error={error}
            handleSubmit={handleSubmit}
          />
        </Paper>
    }
  </div>
);

