Feature('Administrator user', { retries: 3 });

Scenario('can create new users', async function(I) {
  I.login();
  I.waitForElement('#createNewUser');
  const totalUsersBeforeAddingUser = await I.grabTextFrom('#totalUserCount');
  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  I.seeInCurrentUrl('/account/users/add');

  const newUser = await I.createFakeUser();
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
    `account/users/${newUser.firstName.toLowerCase()}${newUser.lastName}/profile`,
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
  I.login(newUser.email, 'test1234');

  I.waitForElement('.Profile');
  I.seeInCurrentUrl('account/profile');
  I.see(newUser.firstName);
  I.see(newUser.lastName);
  I.see(newUser.email);
  I.see(newUser.phone);
  I.see('Password');
  I.see('**********');
});

Scenario('can edit company details', async function(I) {
  I.login();
  I.waitForVisible('.Profile');

  const newCompany = await I.createFakeCompany();
  I.click('Edit Company');
  I.waitForElement('#StandardForm');
  I.fillField('Name', newCompany.name);
  I.fillField('Address', newCompany.address);
  I.fillField('Phone', newCompany.phone);
  I.click('Save');

  I.waitForElement('#editCompanySuccess');
  I.see(newCompany.name);
  I.see(newCompany.address);
  I.see(newCompany.phone);
});

Scenario('can edit a different user details', async function(I) {
  I.login();
  I.waitForElement('.Profile');
  const originalUser = await I.createFakeUser();
  I.createNewUser(originalUser);

  const newUserDetails = await I.createFakeUser();
  I.click('Edit Profile');

  I.clearField('firstName');
  I.fillField('firstName', newUserDetails.firstName);

  I.clearField('lastName');
  I.fillField('lastName', newUserDetails.lastName);

  I.clearField('email');
  I.fillField('email', newUserDetails.email);

  I.clearField('phone');
  I.fillField('phone', newUserDetails.phone);
  I.click('Save');

  I.waitForElement('#editProfileSuccess');
  I.see(newUserDetails.firstName);
  I.see(newUserDetails.lastName);
  I.see(newUserDetails.email);
  I.see(newUserDetails.phone);
});

Scenario('can edit a different user password', async function(I) {
  I.login();
  I.waitForElement('.Profile');
  const originalUser = await I.createFakeUser();
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
