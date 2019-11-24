import React from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { loader } from 'graphql.macro';
import { graphql } from 'react-apollo';

import FormikStandardForm from '../../shared/FormikStandardForm';
import { FormikTextField } from '../../shared/FormikFormElements';

const EditPasswordSchema = Yup.object().shape({
  password: Yup.string().required('required'),
  confirmPassword: Yup.string().required('required'),
});

const EditUserPassword = loader('./EditUserPassword.gql');
const EditPassword = ({ onSubmit, handleCancelEditProfilePassword }) => (
  <Formik
    initialValues={{
      password: '',
      confirmPassword: '',
    }}
    validationSchema={EditPasswordSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, status }) => (
      <FormikStandardForm
        handleCancel={handleCancelEditProfilePassword}
        error={status}
        editingInProgress={isSubmitting}
        fields={[
          <div className="col-12">
            <Field
              key="profile__password"
              name="password"
              type="password"
              label="New Password"
              component={FormikTextField}
            />
          </div>,
          <div className="col-12">
            <Field
              key="profile__confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              component={FormikTextField}
            />
          </div>,
        ]}
      />
    )}
  </Formik>
);

export default graphql(EditUserPassword, {
  props: ({ ownProps, mutate }) => ({
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      if (values.password === values.confirmPassword) {
        try {
          await mutate({
            variables: { id: ownProps.userId, password: values.password },
          });
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
          setStatus(error.graphQLErrors[0].message);
        }
      } else {
        setSubmitting(false);
        setStatus('Passwords do not match');
      }
    },
    ...ownProps,
  }),
})(EditPassword);
