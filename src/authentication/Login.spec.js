import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import LoadingSpinner from '../shared/LoadingSpinner';
import { FormErrorNotification } from '../shared/FormElements';
import { Login } from './Login';

const setup = ({ loggingIn = false, handleSubmit = () => '', error = 'test error' }) => {
  const props = {
    loggingIn,
    handleSubmit,
    error
  };
  const wrapper = shallowWithContext(<Login {...props} />);

  return { wrapper, props };
};

describe('src/authentication/Login.js', () => {
  it('renders the login page', () => {
    const { wrapper, props } = setup({});

    expect(wrapper.find(FormErrorNotification).prop('message')).to.equal(props.error);
    const fields = wrapper.find(Field);
    expect(fields).length.to.be(2);

    const emailField = fields.at(0);
    expect(emailField.prop('name')).to.equal('email');
    expect(emailField.prop('label')).to.equal('Enter your email');

    const passwordField = fields.at(1);
    expect(passwordField.prop('name')).to.equal('password');
    expect(passwordField.prop('label')).to.equal('Enter your password');
    expect(passwordField.prop('type')).to.equal('password');
  });

  it('renders the the loading spinner instead of CTAs when logging in', () => {
    const { wrapper } = setup({ loggingIn: true });
    expect(wrapper.find(RaisedButton).exists()).to.be.false;
    expect(wrapper.find(LoadingSpinner).exists()).to.be.true;
  });

  it('renders the the CTAs when not logging in', () => {
    const { wrapper } = setup({ loggingIn: false });

    const submitButton = wrapper.find(RaisedButton);
    expect(wrapper.find(LoadingSpinner).exists()).to.be.false;
    expect(submitButton.exists()).to.be.true;
    expect(submitButton.prop('label')).to.equal('Sign in');
    expect(submitButton.prop('type')).to.equal('submit');
  });

  it(
    'calls handle submit',
    sinon.test(function() {
      const handleSubmit = this.spy();
      const { wrapper } = setup({ handleSubmit });

      const form = wrapper.find('form');
      expect(form.exists()).to.be.true;

      form.prop('onSubmit')();
      expect(handleSubmit).to.have.been.called;
    })
  );
});
