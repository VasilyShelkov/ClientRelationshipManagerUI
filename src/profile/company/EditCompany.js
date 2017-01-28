import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

import { graphql } from 'react-apollo';
import EditCompanyDetails from './EditCompanyDetails.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';

import { FromErrorNotification, renderTextField, required } from '../../shared/FormElements';

const EditCompany = ({ handleSubmit, handleCancelEditCompany, error }) => (
  <Paper zDepth={2} >
    <div className="Profile__details container">
      <FromErrorNotification message={error} zDepth={3} />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Field
            name="name"
            component={renderTextField}
            label="Name"
            validate={required}
            fullWidth
          />

          <Field
            name="address"
            component={renderTextField}
            label="Address"
            validate={required}
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
              onClick={handleCancelEditCompany}
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

const EditCompanyForm = reduxForm({ form: 'company' })(EditCompany);

export default graphql(EditCompanyDetails, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: (values) => {
      if (checkIfAnyKeysDifferent(ownProps.initialValues, values) > 0) {
        const { id, updated_at, ...formValues } = values;
        try {
          mutate({
            variables: {
              userId: ownProps.userId,
              companyId: ownProps.initialValues.id,
              ...formValues
            }
          });
        } catch (error) {
          throw new SubmissionError({ _error: error });
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
