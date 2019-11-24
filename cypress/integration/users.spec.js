/// <reference types="Cypress" />
import createFakeData from '../support/fakeDataCreator';

context('Users', () => {
  it('can create a new new user', () => {
    cy.login();
    cy.findByText('Users').click();

    cy.findByText('Create New User').click();
    const newUser = createFakeData.createUser();
    cy.findByLabelText('First Name').type(newUser.firstName);
    cy.findByLabelText('Last Name').type(newUser.lastName);
    cy.findByLabelText('Email').type(newUser.email);
    cy.findByLabelText('Phone').type(newUser.phone);
    cy.findByLabelText('New Password').type(newUser.password);
    cy.findByLabelText('Confirm New Password').type(newUser.password);
    cy.findByText('Save').click();

    cy.findByText('Successfully created new user');
    cy.findByText(`${newUser.firstName} ${newUser.lastName}`);
    cy.findByText(newUser.email);
    cy.findByText(newUser.phone);
    cy.findByText('Password');
    cy.findByText('**********');
    cy.logout();

    cy.login(newUser.email, 'test1234');
    cy.findByText(`${newUser.firstName} ${newUser.lastName}`);
    cy.findByText(newUser.email);
    cy.findByText(newUser.phone);
    cy.findByText('Password');
    cy.findByText('**********');
  });

  it('can edit company details', () => {
    cy.login();

    const newCompany = createFakeData.createCompany();
    cy.findByText('Edit Company').click();
    cy.findByLabelText('Company Name')
      .clear()
      .type(newCompany.name);
    cy.findByLabelText('Address')
      .clear()
      .type(newCompany.address);
    cy.get('.ap-input-icon.ap-icon-clear').click();
    cy.findByLabelText('Phone')
      .clear()
      .type(newCompany.phone);
    cy.findByText('Save').click();

    cy.findByText('Successfully updated');
    cy.findByText(newCompany.name);
    cy.findByText(newCompany.address);
    cy.findByText(newCompany.phone);
  });

  it("can edit another user's details", () => {
    cy.login();
    const newUser = createFakeData.createUser();
    cy.createNewUser(newUser);

    const editedUser = createFakeData.createUser();
    cy.findByText('Edit Profile').click();

    cy.findByLabelText('First Name')
      .clear()
      .type(editedUser.firstName);
    cy.findByLabelText('Last Name')
      .clear()
      .type(editedUser.lastName);
    cy.findByLabelText('Email')
      .clear()
      .type(editedUser.email);
    cy.findByLabelText('Phone')
      .clear()
      .type(editedUser.phone);
    cy.findByText('Save').click();

    cy.findByText('Successfully updated');
    cy.findByText(`${editedUser.firstName} ${editedUser.lastName}`);
    cy.findByText(editedUser.email);
    cy.findByText(editedUser.phone);
  });

  it("can edit a differenet user's passsword", () => {
    cy.login();
    const newUser = createFakeData.createUser();
    cy.createNewUser(newUser);

    const newPassword = '4321tset';
    cy.findByTestId('resetPassword').click();
    cy.findByLabelText('New Password').type(newPassword);
    cy.findByLabelText('Confirm New Password').type(newPassword);
    cy.findByText('Save').click();

    cy.logout();
    cy.login(newUser.email, newPassword);
    cy.findByText(`${newUser.firstName} ${newUser.lastName}`);
  });
});
