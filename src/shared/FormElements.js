import React, { Component } from 'react';
import { TextField } from 'redux-form-material-ui';
import places from 'places.js';

import { red600 } from 'material-ui/styles/colors';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import Notification from './Notification';

export const required = value => (value ? undefined : 'Required');
export const minLength = value => (value.length > 6 ? undefined : 'Minimum length of 6 characters');

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
export const emailFormat = value => (emailRegex.test(value) ? undefined : 'Not a valid email address');

export const renderTextField = ({ input, label, meta: { touched, error }, ...customProps }) => (
  <TextField floatingLabelText={label} errorText={touched && error} {...input} {...customProps} />
);

export class AddressField extends Component {
  componentDidMount() {
    places({
      container: document.querySelector('#company-address-input')
    });
  }

  render() {
    const { input, label, meta: { touched, error }, ...customProps } = this.props;

    return (
      <TextField
        id="company-address-input"
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...customProps}
      />
    );
  }
}

export const renderCheckbox = ({ input, label }) => (
  <TextField label={label} checked={input.value} onCheck={input.onChange} />
);

export const FormErrorNotification = ({ message, zDepth, backgroundColor = red600 }) => (
  <Notification
    message={message}
    zDepth={zDepth}
    backgroundColor={red600}
    icon={<ErrorIcon className="Form__notification__icon" style={{ color: 'white' }} />}
  />
);
