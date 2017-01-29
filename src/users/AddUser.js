import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import Paper from 'material-ui/Paper';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { cyan500 } from 'material-ui/styles/colors';

import CreateUser from './CreateUser.gql';
import GetUserCompany from './GetUserCompany.gql';
import StandardForm from '../shared/StandardForm';
import {
  renderTextField, required, emailFormat, minLength
} from '../shared/FormElements';
import LoadingSpinner from '../shared/LoadingSpinner';

export const AddUser = ({ queryLoading, handleSubmit, error }) => (
  <div>
    {
      queryLoading ?
        <LoadingSpinner />
      :
        <Paper style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <PersonAddIcon style={{ height: '100px', width: '100px' }} color={cyan500} />
            <h2>Add a new member to the team...</h2>
          </div>
          <StandardForm
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
              />,
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
            error={error}
            handleSubmit={handleSubmit}
          />
        </Paper>
    }
  </div>
);

const AddUserForm = reduxForm({ form: 'newUser' })(AddUser);

const AddUserFormWithCompanyData = graphql(CreateUser, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        const { id, __typename, ...companyFields } = ownProps.user.company;

        const { confirmPassword, firstName, lastName, ...otherValues } = values;
        const userFields = {
          firstName: _.upperFirst(firstName.trim()),
          lastName: _.upperFirst(lastName.trim()),
          ...otherValues
        };

        try {
          await mutate({ variables: { ...userFields, companyFields } });
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
})(AddUserForm);

const AddUserFormWithProfileData = graphql(GetUserCompany, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    queryLoading: loading,
    user,
    ...ownProps
  })
})(AddUserFormWithCompanyData);

const mapStateToProps = state => ({
  id: state.account.id,
  editingProfile: state.profile.editing.profile,
  editingCompany: state.profile.editing.company
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserFormWithProfileData);
