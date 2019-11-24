import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Paper from '@material-ui/core/Paper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import {
  FormikTextField,
  FormikCheckBox,
  FormikSlider,
} from '../shared/FormikFormElements';
import LoadingSpinner from '../shared/LoadingSpinner';
import FormikStandardForm from '../shared/FormikStandardForm';

const AddUserSchema = Yup.object().shape({
  protectedNamesLimit: Yup.number().required('required'),
  firstName: Yup.string().required('required'),
  lastName: Yup.string().required('required'),
  phone: Yup.string().required('required'),
  email: Yup.string()
    .required('required')
    .email('must be a valid email'),
  password: Yup.string().required('required'),
  confirmPassword: Yup.string().required('required'),
});

export default ({ currentProtectedNamesLimit, queryLoading, onSubmit }) => {
  return (
    <div>
      {queryLoading ? (
        <LoadingSpinner />
      ) : (
        <Paper style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <PersonAddIcon
              color="primary"
              style={{ height: '100px', width: '100px' }}
            />
            <h2>Add a new member to the team...</h2>
          </div>
          <Formik
            initialValues={{
              protectedNamesLimit: 150,
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
              isAdmin: false,
            }}
            validationSchema={AddUserSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, status }) => (
              <FormikStandardForm
                editingInProgress={isSubmitting}
                error={status}
                fields={[
                  <div key="1" className="col-12">
                    <Field
                      name="firstName"
                      label="First Name"
                      component={FormikTextField}
                    />
                  </div>,
                  <div key="2" className="col-12">
                    <Field
                      name="lastName"
                      label="Last Name"
                      component={FormikTextField}
                    />
                  </div>,
                  <div key="3" className="col-12">
                    <Field
                      type="email"
                      name="email"
                      label="Email"
                      component={FormikTextField}
                    />
                  </div>,
                  <div key="4" className="col-12">
                    <Field
                      name="phone"
                      label="Phone"
                      component={FormikTextField}
                    />
                  </div>,
                  <div
                    key="5"
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
                  </div>,
                  <div key="6" className="col-12">
                    <Field
                      name="password"
                      label="New Password"
                      component={FormikTextField}
                    />
                  </div>,
                  <div key="7" className="col-12">
                    <Field
                      name="confirmPassword"
                      label="Confirm New Password"
                      component={FormikTextField}
                    />
                  </div>,
                  <div
                    key="8"
                    className="col-12"
                    style={{ margin: '20px 0px' }}
                  >
                    <FormikCheckBox name="isAdmin" label="Administrator" />
                  </div>,
                ]}
              />
            )}
          </Formik>
        </Paper>
      )}
    </div>
  );
};
