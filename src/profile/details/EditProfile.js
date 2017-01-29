import React from 'react';
import { graphql } from 'react-apollo';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Paper from 'material-ui/Paper';

import EditUserDetails from './EditUserDetails.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';

import { renderTextField, required, emailFormat } from '../../shared/FormElements';
import StandardForm from '../../shared/StandardForm';

const EditProfile = ({
  handleSubmit, handleCancelEditProfile, error, editInProgess
}) => (
  <Paper zDepth={2} >
    <StandardForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancelEditProfile}
      error={error}
      editingInProgress={editInProgess}
      fields={[
        <Field
          name="firstName"
          component={renderTextField}
          label="First name"
          validate={required}
          fullWidth
        />,
        <Field
          name="lastName"
          component={renderTextField}
          label="Last Name"
          validate={required}
          fullWidth
        />,
        <Field
          name="email"
          component={renderTextField}
          label="Email"
          validate={[required, emailFormat]}
          fullWidth
        />,
        <Field
          name="phone"
          component={renderTextField}
          label="Phone"
          validate={required}
          fullWidth
        />
      ]}
    />
  </Paper>
);

const EditProfileForm = reduxForm({ form: 'profile' })(EditProfile);

export default graphql(EditUserDetails, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values) => {
      if (checkIfAnyKeysDifferent(ownProps.initialValues, values) > 0) {
        const { company, created_at, updated_at, ...formValues } = values;
        try {
          await mutate({ variables: formValues });
        } catch (error) {
          throw new SubmissionError({ _error: error.graphQLErrors[0].message });
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
