import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import LoadingSpinner from '../shared/LoadingSpinner';
import { FormErrorNotification } from '../shared/FormElements';
import { Login } from './Login';

const setup = ({
  loggingIn = false,
  handleSubmit = () => '',
  error = 'test error',
}) => {
  const props = {
    loggingIn,
    handleSubmit,
    error,
  };
  const wrapper = shallowWithContext(<Login {...props} />);

  return { wrapper, props };
};

describe('src/authentication/Login.js', () => {
  it('renders the login page', () => {
    const { wrapper, props } = setup({});

    expect(wrapper.find(FormErrorNotification).prop('message')).toBe(props.error);
    const fields = wrapper.find(Field);
    expect(fields.length).toBe(2);

    const emailField = fields.at(0);
    expect(emailField.prop('name')).toBe('email');
    expect(emailField.prop('label')).toBe('Enter your email');

    const passwordField = fields.at(1);
    expect(passwordField.prop('name')).toBe('password');
    expect(passwordField.prop('label')).toBe('Enter your password');
    expect(passwordField.prop('type')).toBe('password');
  });

  it('renders the the loading spinner instead of CTAs when logging in', () => {
    const { wrapper } = setup({ loggingIn: true });
    expect(wrapper.find(RaisedButton).exists()).toBe(false);
    expect(wrapper.find(LoadingSpinner).exists()).toBe(true);
  });

  it('renders the the CTAs when not logging in', () => {
    const { wrapper } = setup({ loggingIn: false });

    const submitButton = wrapper.find(RaisedButton);
    expect(wrapper.find(LoadingSpinner).exists()).toBe(false);
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.prop('label')).toBe('Sign in');
    expect(submitButton.prop('type')).toBe('submit');
  });

  it('calls handle submit', () => {
    const handleSubmit = jest.fn();
    const { wrapper } = setup({ handleSubmit });

    const form = wrapper.find('form');
    expect(form.exists()).toBe(true);

    form.prop('onSubmit')();
    expect(handleSubmit).toHaveBeenCalled();
  });
});
