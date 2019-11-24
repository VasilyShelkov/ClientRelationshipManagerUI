/// <reference types="Cypress" />

context('Authentication', () => {
  it('User is redirected to login when not logged in', () => {
    cy.visit('/account/profile');
    cy.findByLabelText('Enter your email');
    cy.url().should('include', '/login');
  });

  it('User is taken to their profile after logging in by default', () => {
    cy.login();
    cy.findByText('Vasily Shelkov');
    cy.findByText('vasilydshelkov@gmail.com');
    cy.url().should('include', '/account/profile');
    cy.logout();
  });

  [
    '/account/names/unprotected',
    '/account/names/unprotected/add',
    '/account/names/protected',
    '/account/names/metWithProtected',
    '/account/names/clients',
    '/account/users/add',
  ].forEach(url =>
    it(`User is taken to ${url} after being redirected to login`, () => {
      cy.visit(url);
      cy.findByLabelText('Enter your email').type('vasilydshelkov@gmail.com');
      cy.findByLabelText('Enter your password').type(Cypress.env('password'));
      cy.findByText('Log in').click();
      cy.url().should('include', url);
      cy.logout();
    }),
  );
});
