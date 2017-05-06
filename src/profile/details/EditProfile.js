import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form';
import { TextField, Slider } from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';

import EditUserDetails from './EditUserDetails.gql';
import { checkIfAnyKeysDifferent } from '../../shared/utils';

import { required, emailFormat } from '../../shared/FormElements';
import StandardForm from '../../shared/StandardForm';

const EditProfile = ({
  currentProtectedNamesLimit,
  isAdmin,
  error,
  editInProgess,
  handleSubmit,
  handleCancelEditProfile
}) => (
  <Paper zDepth={2}>
    <StandardForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancelEditProfile}
      error={error}
      editingInProgress={editInProgess}
      fields={[
        <Field
          key="profile__firstName"
          name="firstName"
          component={TextField}
          floatingLabelText="First name"
          validate={required}
          fullWidth
        />,
        <Field
          key="profile__lastName"
          name="lastName"
          component={TextField}
          floatingLabelText="Last Name"
          validate={required}
          fullWidth
        />,
        <Field
          key="profile__email"
          name="email"
          component={TextField}
          floatingLabelText="Email"
          validate={[required, emailFormat]}
          fullWidth
        />,
        <Field
          key="profile__phone"
          name="phone"
          component={TextField}
          floatingLabelText="Phone"
          validate={required}
          fullWidth
        />,
        isAdmin &&
          <div style={{ marginTop: '10px', textAlign: 'center', width: '100%' }}>
            <div>Protected Names Limit</div>
            <div>{currentProtectedNamesLimit}</div>
            <div>
              <Field
                key="profile__protectedNamesLimit"
                name="protectedNamesLimit"
                sliderStyle={{ marginBottom: '0px' }}
                component={Slider}
                defaultValue={currentProtectedNamesLimit}
                format={null}
                min={0}
                max={1000}
                step={1}
              />
            </div>
          </div>
      ]}
    />
  </Paper>
);

const selector = formValueSelector('profile');

const FormWithSelectors = connect(state => ({
  currentProtectedNamesLimit: selector(state, 'protectedNamesLimit'),
  isAdmin: state.account.accountType === 'admin'
}))(EditProfile);

const EditProfileForm = reduxForm({
  form: 'profile'
})(FormWithSelectors);

export default graphql(EditUserDetails, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async values => {
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
