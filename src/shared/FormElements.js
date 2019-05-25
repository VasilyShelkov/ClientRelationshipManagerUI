import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { TextField } from '@material-ui/core';
import { TextField as ReduxFormTextField } from 'redux-form-material-ui';
import places from 'places.js';

import { red600 } from 'material-ui/styles/colors';
import ErrorIcon from 'material-ui/svg-icons/alert/error';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PrivateIcon from 'material-ui/svg-icons/action/visibility';
import PublicIcon from 'material-ui/svg-icons/social/people';
import Notification from './Notification';

export const required = value => (value ? undefined : 'Required');
export const minLength = value =>
  value.length > 6 ? undefined : 'Minimum length of 6 characters';

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
export const emailFormat = value =>
  emailRegex.test(value) ? undefined : 'Not a valid email address';

export const FormikTextField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const error = touched[field.name] && errors[field.name];
  return (
    <div data-testid={`${field.name}-field`}>
      <TextField
        label={props.label}
        error={Boolean(error)}
        helperText={error}
        id={props.id || `${field.name}-input`}
        fullWidth={true}
        margin={props.margin || 'normal'}
        {...field}
      />
    </div>
  );
};

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...customProps
}) => (
  <ReduxFormTextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...customProps}
  />
);

export class AddressField extends Component {
  componentDidMount() {
    if (!Cookies.get('disable-places')) {
      places({
        container: document.querySelector('#company-address-input'),
      });
    }
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      ...customProps
    } = this.props;

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

export const renderIconDropdown = ({ input: { value, onChange } }) => (
  <DropDownMenu
    id="name-visibility-field"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    value={value}
    onChange={(event, index, dropdownValue) => onChange(dropdownValue)}
    style={{ height: '35px' }}
    iconStyle={{ top: '-1px', right: '-35px', padding: '0px' }}
    labelStyle={{ padding: '0px' }}
    underlineStyle={{ borderTop: '0px' }}
  >
    <MenuItem
      id="private-comment-visibility-choice"
      value="private"
      leftIcon={<PrivateIcon />}
      label={<PrivateIcon />}
      primaryText={
        <div style={{ lineHeight: '20px' }}>
          <strong>Private</strong>
          <div>Only you can see it</div>
        </div>
      }
    />
    <MenuItem
      id="public-comment-visibility-choice"
      value="public"
      leftIcon={<PublicIcon />}
      label={<PublicIcon />}
      primaryText={
        <div style={{ lineHeight: '20px' }}>
          <strong>Public</strong>
          <div>Whole company can see it</div>
        </div>
      }
    />
  </DropDownMenu>
);

export const FormErrorNotification = ({
  message,
  zDepth,
  backgroundColor = red600,
}) => (
  <Notification
    message={message}
    zDepth={zDepth}
    backgroundColor={backgroundColor}
    icon={
      <ErrorIcon
        className="Form__notification__icon"
        style={{ color: 'white' }}
      />
    }
  />
);
