import React from 'react';
import { TextField } from 'redux-form-material-ui';

export const required = value => (value ? undefined : 'Required');
export const minLength = value => (value.length > 6 ? undefined : 'Minimum length of 6 characters');

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
export const emailFormat = value => (emailRegex.test(value) ? undefined : 'Not a valid email address');

export const renderTextField = ({ input, label, meta: { touched, error }, ...customProps }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...customProps}
  />
);

