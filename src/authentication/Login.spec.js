import React from 'react';
import {
  fireEvent,
  wait,
  waitForElement,
  waitForElementToBeRemoved,
} from 'react-testing-library';
import userEvent from 'user-event';

import Login from './Login';
import { renderWithProviders } from '../testUtils';

const renderLogin = () => {
  return renderWithProviders(<Login />);
};

describe('src/authentication/Login.js', () => {
  it('Logging in without an email address shows an error message', async () => {
    const { getByTestId, getByText } = renderLogin();
    fireEvent.submit(getByText('Log in'));

    await wait(() => {
      expect(getByTestId('email-field')).toHaveTextContent('required');
    });
  });

  it('Entering an invalid email address shows an error message', async () => {
    const { getByText, getByLabelText } = renderLogin();
    const emailInput = getByLabelText('Enter your email');
    userEvent.type(emailInput, 'invalidbla');
    fireEvent.blur(emailInput);

    await waitForElement(() => getByText('must be a valid email'));
  });

  it('Logging in without a password shows error message', async () => {
    const { getByText, getByTestId } = renderLogin();
    fireEvent.submit(getByText('Log in'));

    await wait(() => {
      expect(getByTestId('password-field')).toHaveTextContent('required');
    });
  });

  it('While they are waiting to login, there is a loading indicator', async () => {
    const { getByText, getByTestId, getByLabelText } = renderLogin();
    userEvent.type(getByLabelText('Enter your email'), 'test@test.com');
    userEvent.type(getByLabelText('Enter your password'), 'test123');
    fireEvent.submit(getByText('Log in'));

    await waitForElement(() => getByTestId('button-loading'));
  });

  it('Shows an error message if the email or password is invalid', async () => {
    const { getByText, getByLabelText, getByTestId } = renderLogin();
    userEvent.type(getByLabelText('Enter your email'), 'test@test.com');
    userEvent.type(getByLabelText('Enter your password'), 'test123');
    fireEvent.submit(getByText('Log in'));

    await waitForElementToBeRemoved(() => getByTestId('button-loading'));
    expect(getByText('Email or password are invalid')).toBeInTheDocument();
  });
});
