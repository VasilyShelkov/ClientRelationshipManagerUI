import React from 'react';
import { graphql } from 'react-apollo';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { loader } from 'graphql.macro';

import { checkIfAnyKeysDifferent } from '../../../shared/utils';
import { required } from '../../../shared/FormElements';
import StandardForm from '../../../shared/StandardForm';

const EditName = loader('./EditName.gql');
const EditSelectedName = ({
  isProtected,
  error,
  handleSubmit,
  cancelEditName,
}) => (
  <StandardForm
    error={error}
    handleSubmit={handleSubmit}
    handleCancel={cancelEditName}
    fields={[
      <Field
        key="editName__firstName"
        name="firstName"
        component={TextField}
        floatingLabelText="First Name"
        validate={required}
        disabled={isProtected}
        fullWidth
      />,
      <Field
        key="editName__lastName"
        name="lastName"
        component={TextField}
        floatingLabelText="Last Name"
        validate={required}
        disabled={isProtected}
        fullWidth
      />,
      <Field
        key="editName__phone"
        name="phone"
        component={TextField}
        floatingLabelText="Phone"
        validate={required}
        fullWidth
      />,
    ]}
  />
);

const EditSelectedNameForm = reduxForm({ form: 'editName' })(EditSelectedName);

export default graphql(EditName, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async ({ id, ...formValues }) => {
      if (checkIfAnyKeysDifferent(ownProps.initialValues, formValues) > 0) {
        try {
          await mutate({
            variables: {
              userId: ownProps.userId,
              nameId: id,
              ...formValues,
            },
          });
          ownProps.cancelEditName();
        } catch (error) {
          throw new SubmissionError({ _error: error.graphQLErrors[0].message });
        }
      } else {
        throw new SubmissionError({
          _error:
            'Please change one of the name fields to to update the name...',
        });
      }
    },
    ...ownProps,
  }),
})(EditSelectedNameForm);
