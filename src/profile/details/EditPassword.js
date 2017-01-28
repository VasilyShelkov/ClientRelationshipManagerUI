import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { graphql } from 'react-apollo';
import EditUserPassword from './EditUserPassword.gql';

import { renderTextField, required, minLength } from '../../shared/FormElements';
import StandardForm from '../../shared/StandardForm';

const EditPassword = ({ handleSubmit, handleCancelEditProfilePassword, error }) => (
  <StandardForm
    handleSubmit={handleSubmit}
    handleCancel={handleCancelEditProfilePassword}
    error={error}
    fields={[
      <Field
        name="password"
        type="password"
        component={renderTextField}
        label="New Password"
        validate={[required, minLength]}
        fullWidth
      />,
      <Field
        name="confirmPassword"
        type="password"
        component={renderTextField}
        label="Confirm New Password"
        validate={[required, minLength]}
        fullWidth
      />
    ]}
  />
);

export const EditPasswordForm = reduxForm({ form: 'profilePassword' })(EditPassword);

export default graphql(EditUserPassword, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        try {
          await mutate({ variables: { id: ownProps.userId, password: values.password } });
        } catch (error) {
          throw new SubmissionError({ _error: error.graphQLErrors[0].message });
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
