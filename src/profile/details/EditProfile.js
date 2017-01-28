import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { graphql } from 'react-apollo';
import EditUserDetails from './EditUserDetails.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';

import { FromErrorNotification, renderTextField, required, emailFormat } from '../../shared/FormElements';

const EditProfile = ({ handleSubmit, handleCancelEditProfile, error }) => (
  <Paper zDepth={2} >
    <div className="Profile__details container">
      <FromErrorNotification message={error} zDepth={3} />
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
          <div className="col-6">
            <RaisedButton
              secondary
              fullWidth
              label="Cancel"
              onClick={handleCancelEditProfile}
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
  </Paper>
);

const EditProfileForm = reduxForm({ form: 'profile' })(EditProfile);

export default graphql(EditUserDetails, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: (values) => {
      if (checkIfAnyKeysDifferent(ownProps.initialValues, values) > 0) {
        const { company, created_at, updated_at, ...formValues } = values;
        try {
          mutate({ variables: formValues });
        } catch (error) {
          throw new SubmissionError({ _error: error });
        }
      } else {
        throw new SubmissionError({
          _error: 'Please change one of the profile fields to to update your profile...'
        });
      }
    },
    ...ownProps
  })
})(EditProfileForm);
