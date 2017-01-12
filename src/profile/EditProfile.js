import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { renderTextField, required, emailFormat } from '../shared/FormElements';

const EditProfileForm = ({ handleSubmit, handleCancelEditProfile }) => (
  <Paper zDepth={2} >
    <div className="Profile__details">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Field
            name="firstName"
            component={renderTextField}
            label="First name"
            validate={required}
            fullWidth
          />

          <Field
            name="lastName"
            component={renderTextField}
            label="Last Name"
            validate={required}
            fullWidth
          />

          <Field
            name="email"
            component={renderTextField}
            label="Email"
            validate={[required, emailFormat]}
            fullWidth
          />

          <Field
            name="phone"
            component={renderTextField}
            label="Phone"
            validate={required}
            fullWidth
          />
        </div>

        <br />

        <div className="row">
          <div className="col-xs-6">
            <RaisedButton
              secondary
              fullWidth
              label="Cancel"
              onClick={handleCancelEditProfile}
              icon={<CancelIcon />}
            />
          </div>

          <div className="col-xs-6">
            <RaisedButton
              primary
              fullWidth
              label="Save"
              type="submit"
              icon={<SaveIcon />}
            />
          </div>
        </div>
      </form>
    </div>
  </Paper>
);

export default reduxForm({ form: 'profile' })(EditProfileForm);
