Feature('Administrator user');

Scenario('can create new users', function *(I) {
  I.login();
  I.waitForElement('#createNewUser');
  const totalUsersBeforeAddingUser = yield I.grabTextFrom('#totalUserCount');
  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  I.seeInCurrentUrl('/account/users/add');

  const newUser = yield I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');

  // navbar check

  // profile check
  I.waitForElement('.Form__notification');
  I.seeInCurrentUrl(
    `account/users/${newUser.firstName.toLowerCase()}${newUser.lastName}/profile`
  );
  I.see('Successfully created new user', '.Form__notification');
  I.see(`${parseInt(totalUsersBeforeAddingUser, 10) + 1} Users`);
  I.see(newUser.firstName);
  I.see(newUser.lastName);
  I.see(newUser.email);
  I.see(newUser.phone);
  I.see('Password');
  I.see('**********');

  I.click('Logout');
  I.login(newUser.email);

  I.waitForElement('.Profile');
  I.seeInCurrentUrl('account/profile');
  I.see(newUser.firstName);
  I.see(newUser.lastName);
  I.see(newUser.email);
  I.see(newUser.phone);
  I.see('Password');
  I.see('**********');
});

Scenario('can edit company details', function *(I) {
  I.login();
  I.waitForElement('.Profile');

  const newCompany = yield I.createFakeCompany();
  I.click('Edit Company');
  I.fillField('name', newCompany.name);
  I.fillField('address', newCompany.address);
  I.fillField('phone', newCompany.phone);
  I.click('Save');

  I.waitForElement('#editCompanySuccess');
  I.see(newCompany.name);
  I.see(newCompany.address);
  I.see(newCompany.phone);
});

Scenario('can edit a different user details', function *(I) {
  I.login();
  I.waitForElement('.Profile');
  const originalUser = yield I.createFakeUser();
  I.createNewUser(originalUser);

  const newUserDetails = yield I.createFakeUser();
  I.click('Edit Profile');
  I.fillField('firstName', newUserDetails.firstName);
  I.fillField('lastName', newUserDetails.lastName);
  I.fillField('email', newUserDetails.email);
  I.fillField('phone', newUserDetails.phone);
  I.click('Save');

  I.waitForElement('#editProfileSuccess');
  I.see(newUserDetails.firstName);
  I.see(newUserDetails.lastName);
  I.see(newUserDetails.email);
  I.see(newUserDetails.phone);
});

Scenario('can edit a different user password', function *(I) {
  I.login();
  I.waitForElement('.Profile');
  const originalUser = yield I.createFakeUser();
  I.createNewUser(originalUser);

  const newPassword = '4321tset';
  I.click('#resetPassword');
  I.fillField('password', newPassword);
  I.fillField('confirmPassword', newPassword);
  I.click('Save');

  I.waitForElement('#editProfileSuccess');
  I.click('Logout');
  I.login(originalUser.email, newPassword);
  I.waitForElement('.Profile');
  I.see(originalUser.firstName);
  I.see(originalUser.lastName);
  I.see(originalUser.email);
  I.see(originalUser.phone);
});
