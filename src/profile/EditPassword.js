import React from 'react';
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { renderTextField, required } from '../shared/FormElements';

const EditPasswordForm = ({ handleSubmit, handleCancelEditProfilePassword }) => (
    <div className="Profile__details container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Field
            name="password"
            component={renderTextField}
            label="New Password"
            validate={[required]}
            fullWidth
          />

          <Field
            name="confirmPassword"
            component={renderTextField}
            label="Confirm New Password"
            validate={required}
            fullWidth
          />
        </div>

        <br />

        <div className="row">
          <div className="col-6">
            <RaisedButton
              secondary
              fullWidth
              label="Cancel"
              onClick={handleCancelEditProfilePassword }
              icon={<CancelIcon />}
            />
          </div>

          <div className="col-6">
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
);

export default reduxForm({ form: 'profilePassword' })(EditPasswordForm);
