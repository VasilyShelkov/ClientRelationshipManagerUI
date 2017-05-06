import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import Paper from 'material-ui/Paper';

import { graphql } from 'react-apollo';
import EditCompanyDetails from './EditCompanyDetails.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';

import { AddressField, required } from '../../shared/FormElements';
import StandardForm from '../../shared/StandardForm';

const EditCompany = ({ handleSubmit, handleCancelEditCompany, error, editInProgress }) => (
  <Paper zDepth={2}>
    <StandardForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancelEditCompany}
      error={error}
      editInProgress={editInProgress}
      fields={[
        <div className="col-12">
          <Field
            key="company__name"
            name="name"
            component={TextField}
            floatingLabelText="Name"
            validate={required}
            fullWidth
          />
        </div>,
        <div className="col-12">
          <Field
            key="company__address"
            name="address"
            component={AddressField}
            floatingLabelText="Address"
            validate={required}
            fullWidth
          />
        </div>,
        <div className="col-12">
          <Field
            key="company__phone"
            name="phone"
            component={TextField}
            floatingLabelText="Phone"
            validate={required}
            fullWidth
          />
        </div>
      ]}
    />
  </Paper>
);

const EditCompanyForm = reduxForm({ form: 'company' })(EditCompany);

export default graphql(EditCompanyDetails, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async values => {
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
