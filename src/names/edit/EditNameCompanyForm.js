import React from 'react';
import { graphql } from 'react-apollo';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import EditCompany from './EditCompany.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';
import { AddressField, required } from '../../shared/FormElements';
import StandardForm from '../../shared/StandardForm';

const EditSelectedName = ({ error, handleSubmit, cancelEditNameCompany }) => (
  <StandardForm
    error={error}
    handleSubmit={handleSubmit}
    handleCancel={cancelEditNameCompany}
    fields={[
      <Field
        key="editNameCompany__name"
        name="name"
        component={TextField}
        floatingLabelText="First Name"
        validate={required}
        fullWidth
      />,
      <Field
        key="editNameCompany__phone"
        name="phone"
        component={TextField}
        floatingLabelText="Phone"
        validate={required}
        fullWidth
      />,
      <Field
        key="editNameCompany__address"
        name="address"
        component={AddressField}
        floatingLabelText="Address"
        validate={required}
        fullWidth
      />
    ]}
  />
);

const EditSelectedNameForm = reduxForm({ form: 'editName' })(EditSelectedName);

export default graphql(EditCompany, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async ({ id, ...formValues }) => {
      if (checkIfAnyKeysDifferent(ownProps.initialValues, formValues) > 0) {
        try {
          await mutate({
            variables: {
              userId: ownProps.userId,
              companyId: id,
              ...formValues
            }
          });
          ownProps.cancelEditNameCompany();
        } catch (error) {
          throw new SubmissionError({ _error: error.graphQLErrors[0].message });
        }
      } else {
        throw new SubmissionError({
          _error: 'Please change one of the company fields to to update the company...'
        });
      }
    },
    ...ownProps
  })
})(EditSelectedNameForm);
