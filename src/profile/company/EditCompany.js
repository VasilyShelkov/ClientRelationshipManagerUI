import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import Paper from 'material-ui/Paper';

import { graphql } from 'react-apollo';
import EditCompanyDetails from './EditCompanyDetails.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';

import { renderTextField, required } from '../../shared/FormElements';
import StandardForm from '../../shared/StandardForm';

const EditCompany = ({ handleSubmit, handleCancelEditCompany, error }) => (
  <Paper zDepth={2} >
    <StandardForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancelEditCompany}
      error={error}
      fields={[
        <Field
          name="name"
          component={renderTextField}
          label="Name"
          validate={required}
          fullWidth
        />,
        <Field
          name="address"
          component={renderTextField}
          label="Address"
          validate={required}
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

const EditCompanyForm = reduxForm({ form: 'company' })(EditCompany);

export default graphql(EditCompanyDetails, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values) => {
      if (checkIfAnyKeysDifferent(ownProps.initialValues, values) > 0) {
        const { id, updated_at, ...formValues } = values;
        try {
          await mutate({
            variables: {
              userId: ownProps.userId,
              companyId: ownProps.initialValues.id,
              ...formValues
            }
          });
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
})(EditCompanyForm);
