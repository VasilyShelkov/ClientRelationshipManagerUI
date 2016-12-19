import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { renderTextField, required, emailFormat } from '../FormElements';

const EditProfileForm = ({
  initialValues: { firstName, lastName, email, phone },
  handleSubmit, handleCancelEditProfile
}) => (
  <Paper zDepth={2} >
    <div className="Profile__details">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="col-xs-12 col-sm-6">
            <Field
              name="firstName"
              component={renderTextField}
              label="First name"
              validate={[required, emailFormat]}
            />
          </div>

          <div className="col-xs-12 col-sm-6">
            <Field
              name="lastName"
              component={renderTextField}
              label="Last Name"
              validate={required}
            />
          </div>

          <div className="col-xs-12 col-sm-6">
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              validate={required}
            />
          </div>

          <div className="col-xs-12 col-sm-6">
            <Field
              name="phone"
              component={renderTextField}
              label="Phone"
              validate={required}
            />
          </div>

          <IconButton tooltip="Cancel" onClick={handleCancelEditProfile}>
            <CancelIcon color="red500" hoverColor="red800" />
          </IconButton>

          <IconButton tooltip="Save" type="submit">
            <SaveIcon color="green500" hoverColor="green900" />
          </IconButton>
        </form>
      </div>
    </div>
  </Paper>
);

export default reduxForm({ form: 'profile' })(EditProfileForm);
