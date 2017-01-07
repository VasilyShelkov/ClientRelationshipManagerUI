import React from 'react';
// import { Login } from './Login';

xdescribe('src/authentication/Login.js', () => {
  it('renders the login page', () => {
    expect(renderer.create(<Login />).toJSON())
      .toMatchSnapshot();
  });

  it('renders the login page with an error', () => {
    expect(renderer.create(<Login error="Test Error" />).toJSON())
      .toMatchSnapshot();
  });

  it('renders the login page with the loading spinner where there would normally be a button', () => {
    expect(renderer.create(<Login loading />).toJSON())
      .toMatchSnapshot();
  });

  it('calls handle submit', () => {
    // TODO
  });
});
