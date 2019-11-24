import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Paper from 'material-ui/Paper';
import { loader } from 'graphql.macro';

import { checkIfAnyKeysDifferent } from '../../shared/utils';

import FormikStandardForm from '../../shared/FormikStandardForm';
import { FormikSlider, FormikTextField } from '../../shared/FormikFormElements';

const EditUserSchema = Yup.object().shape({
  protectedNamesLimit: Yup.number().required('required'),
  firstName: Yup.string().required('required'),
  lastName: Yup.string().required('required'),
  phone: Yup.string().required('required'),
  email: Yup.string()
    .required('required')
    .email('must be a valid email'),
});

const EditUserDetails = loader('./EditUserDetails.gql');
const EditProfile = ({ isAdmin, onSubmit, handleCancelEditProfile }) => (
  <Paper zDepth={2}>
    <Formik
      initialValues={{
        protectedNamesLimit: 150,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }}
      validationSchema={EditUserSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <FormikStandardForm
          handleCancel={handleCancelEditProfile}
          error={status}
          editingInProgress={isSubmitting}
          fields={[
            <div className="col-12">
              <Field
                name="firstName"
                label="First Name"
                component={FormikTextField}
              />
            </div>,
            <div className="col-12">
              <Field
                name="lastName"
                label="Last Name"
                component={FormikTextField}
              />
            </div>,
            <div className="col-12">
              <Field
                type="email"
                name="email"
                label="Email"
                component={FormikTextField}
              />
            </div>,
            <div className="col-12">
              <Field name="phone" label="Phone" component={FormikTextField} />
            </div>,
            isAdmin && (
              <div
                className="col-12"
                style={{ marginTop: '10px', textAlign: 'center' }}
              >
                <FormikSlider
                  name="protectedNamesLimit"
                  label="Protected Names Limit"
                  component={FormikSlider}
                  defaultValue={150}
                  min={0}
                  max={1000}
                />
              </div>
            ),
          ]}
        />
      )}
    </Formik>
  </Paper>
);

const FormWithSelectors = connect(state => ({
  isAdmin: state.account.accountType === 'admin',
}))(EditProfile);

export default graphql(EditUserDetails, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      if (checkIfAnyKeysDifferent(ownProps.initialValues, values) > 0) {
        const { company, created_at, updated_at, ...formValues } = values;
        try {
          await mutate({ variables: formValues });
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
          setStatus(error.graphQLErrors[0].message);
        }
      } else {
        setSubmitting(false);
        setStatus(
          'Please change one of the profile fields to to update your profile...',
        );
      }
    },
    ...ownProps,
  }),
})(FormWithSelectors);
