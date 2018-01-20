import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { AutoComplete, TextField } from 'redux-form-material-ui';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import Paper from 'material-ui/Paper';

import EditCompanyDetails from './EditCompanyDetails.gql';
import GetAllCompanies from '../../names/GetAllCompanies.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';
import { AddressField, required } from '../../shared/FormElements';
import LoadingSpinner from '../../shared/LoadingSpinner';
import StandardForm from '../../shared/StandardForm';

const EditCompany = ({
  existingCompanies,
  loading,
  error,
  editInProgress,
  change,
  handleSubmit,
  handleCancelEditCompany,
}) => (
  <Paper zDepth={2}>
    {loading ? (
      <LoadingSpinner />
    ) : (
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
              component={AutoComplete}
              floatingLabelText="Company Name"
              openOnFocus
              filter={MUIAutoComplete.fuzzyFilter}
              onNewRequest={companyName => {
                const companyInfo = existingCompanies.find(
                  company => company.name === companyName,
                );

                change('companyAddress', companyInfo.address);
                change('companyPhone', companyInfo.phone);
              }}
              dataSource={existingCompanies.map(info => info.name)}
              maxSearchResults={10}
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
          </div>,
        ]}
      />
    )}
  </Paper>
);

const EditCompanyForm = reduxForm({ form: 'company' })(EditCompany);

export default compose(
  graphql(EditCompanyDetails, {
    props: ({ ownProps, mutate }) => ({
      onSubmit: async values => {
        if (checkIfAnyKeysDifferent(ownProps.initialValues, values) > 0) {
          const { id, updated_at, ...formValues } = values;
          try {
            await mutate({
              variables: {
                userId: ownProps.userId,
                companyId: ownProps.initialValues.id,
                ...formValues,
              },
            });
          } catch (error) {
            throw new SubmissionError({
              _error: error.graphQLErrors[0].message,
            });
          }
        } else {
          throw new SubmissionError({
            _error:
              'Please change one of the company fields to to update the company...',
          });
        }
      },
      ...ownProps,
    }),
  }),
  graphql(GetAllCompanies, {
    props: ({ ownProps, data: { loading, companies } }) => ({
      loading,
      existingCompanies: companies,
      ...ownProps,
    }),
  }),
)(EditCompanyForm);
