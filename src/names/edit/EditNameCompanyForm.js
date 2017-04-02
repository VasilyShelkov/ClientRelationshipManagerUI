import React from 'react';
import { graphql, compose } from 'react-apollo';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { AutoComplete, TextField } from 'redux-form-material-ui';
import { AutoComplete as MUIAutoComplete } from 'material-ui';

import EditCompany from './EditCompany.gql';
import GetAllCompanies from '../GetAllCompanies.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';
import LoadingSpinner from '../../shared/LoadingSpinner';
import StandardForm from '../../shared/StandardForm';
import { AddressField, required } from '../../shared/FormElements';

const EditSelectedName = ({
  existingCompanies, loading, error, handleSubmit, cancelEditNameCompany, change
}) => (
  loading ?
    <LoadingSpinner />
  :
    <StandardForm
      error={error}
      handleSubmit={handleSubmit}
      handleCancel={cancelEditNameCompany}
      fields={[
        <Field
          name="name"
          component={AutoComplete}
          floatingLabelText="Company Name"
          openOnFocus
          filter={MUIAutoComplete.fuzzyFilter}
          onNewRequest={(companyName) => {
            const companyInfo = existingCompanies.find(
              company => company.name === companyName
            );

            change('companyAddress', companyInfo.address);
            change('companyPhone', companyInfo.phone);
          }}
          dataSource={existingCompanies.map(info => info.name)}
          maxSearchResults={10}
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

export default compose(
  graphql(EditCompany, {
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
  }),
  graphql(GetAllCompanies, {
    props: ({ ownProps, data: { loading, companies } }) => ({
      loading,
      existingCompanies: companies,
      ...ownProps
    })
  })
)(EditSelectedNameForm);
