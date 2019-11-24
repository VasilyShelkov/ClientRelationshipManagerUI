// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'login',
  (email = 'vasilydshelkov@gmail.com', password = Cypress.env('password')) => {
    cy.visit('/login');
    cy.findByLabelText('Enter your email').type(email);
    cy.findByLabelText('Enter your password').type(password);
    cy.findByText('Log in').click();
  },
);

Cypress.Commands.add('logout', () => {
  cy.findByTestId('account-menu').click();
  cy.findByText('Logout').click();
});

Cypress.Commands.add('createNewUser', newUser => {
  cy.visit('/account/users');
  cy.findByText('Create New User').click();
  cy.findByLabelText('First Name').type(newUser.firstName);
  cy.findByLabelText('Last Name').type(newUser.lastName);
  cy.findByLabelText('Email').type(newUser.email);
  cy.findByLabelText('Phone').type(newUser.phone);
  cy.findByLabelText('New Password').type(newUser.password);
  cy.findByLabelText('Confirm New Password').type(newUser.password);
  cy.findByText('Save').click();
});
