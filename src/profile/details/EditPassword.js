import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { graphql } from 'react-apollo';
import EditUserPassword from './EditUserPassword.gql';

import { FromErrorNotification, renderTextField, required, minLength } from '../../shared/FormElements';

const EditPassword = ({ handleSubmit, handleCancelEditProfilePassword, error }) => (
  <div className="Profile__details container">
    <FromErrorNotification message={error} zDepth={2} />
    <form onSubmit={handleSubmit}>
      <div className="row">
        <Field
          name="password"
          type="password"
          component={renderTextField}
          label="New Password"
          validate={[required, minLength]}
          fullWidth
        />

        <Field
          name="confirmPassword"
          type="password"
          component={renderTextField}
          label="Confirm New Password"
          validate={[required, minLength]}
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
            onClick={handleCancelEditProfilePassword}
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

export const EditPasswordForm = reduxForm({ form: 'profilePassword' })(EditPassword);

export default graphql(EditUserPassword, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
        try {
          mutate({
            variables: { id: ownProps.userId, password: values.password }
          });
        } catch (error) {
          throw new SubmissionError({ _error: error });
        }
      } else {
        throw new SubmissionError({
          _error: 'Passwords do not match'
        });
      }
    },
    ...ownProps
  })
})(EditPasswordForm);
