const getTestUserDetails = require('./userAccount');

module.exports = function() {
  return actor({
    login: function(email, password, returnUrl) {
      const testUser = getTestUserDetails(process.env.ENVIRONMENT);
      let loginEmail = testUser.email;
      let loginPassword = testUser.password;
      if (email) {
        loginEmail = email;
      }
      if (password) {
        loginPassword = password;
      }
      if (returnUrl) {
        this.amOnPage(returnUrl);
      } else {
        this.amOnPage('/login');
      }
      this.waitForElement('[data-testid="email-field"]');
      this.fillField('email', loginEmail);
      this.fillField('password', loginPassword);
      this.click('Log in');
      this.setCookie({ name: 'disable-places', value: 'true' });
    },
    createNewUser: function(newUser) {
      this.waitForElement('#createNewUser');
      this.click('#createNewUser');
      this.waitForText('Add a new member to the team...');
      this.seeInCurrentUrl('/account/users/add');

      this.fillField('firstName', newUser.firstName);
      this.fillField('lastName', newUser.lastName);
      this.fillField('email', newUser.email);
      this.fillField('phone', newUser.phone);
      this.fillField('password', 'test1234');
      this.fillField('confirmPassword', 'test1234');
      this.click('Save');

      this.waitForElement('.Profile');
      this.seeInCurrentUrl(
        `account/users/${newUser.firstName.toLowerCase()}${
          newUser.lastName
        }/profile`,
      );
    },
    createNewUnprotectedName: function(newName) {
      this.waitForElement('#goToUnprotectedList');
      this.click('#goToUnprotectedList');
      this.waitForElement('#unprotectedNamesList');
      this.click('#createUnprotectedName');

      this.waitForVisible('.StandardForm');
      this.fillField('firstName', newName.firstName);
      this.fillField('lastName', newName.lastName);
      this.fillField('phone', newName.phone);
      this.fillField('input[autocomplete="off"]', newName.company.name);
      this.fillField('companyAddress', newName.company.address);
      this.pressKey('Escape');
      this.fillField('companyPhone', newName.company.phone);
      this.click('Save');
      this.waitForVisible('.sweet-alert.showSweetAlert.visible');
      within('.sweet-alert.showSweetAlert.visible', () => {
        this.click('OK');
      });

      this.waitForElement('#unprotectedNamesList');
    },
    createProtectedName: function(newName) {
      this.createNewUnprotectedName(newName);
      this.click('#protectName');
      this.waitForElement('#protectNameForm');
      this.click('#submitProtectName');
      this.waitToHide('.names__overlay');
      this.waitForVisible('.sweet-alert.showSweetAlert.visible');
      within('.sweet-alert.showSweetAlert.visible', () => {
        this.click('OK');
      });
      this.waitForElement('.hideSweetAlert');
      this.click('#goToProtectedList');
      this.waitForElement('#protectedNamesList');
      this.click('#protectedNamesList');
      this.click('#protectedNamesList .name:nth-of-type(1)');
    },
    createMetWithProtectedName: function(newName) {
      this.createProtectedName(newName);
      this.click('#metWithProtected');
      this.click('#submitMetWithName');
      this.waitToHide('.names__overlay');
      this.waitForVisible('.sweet-alert.showSweetAlert.visible');
      within('.sweet-alert.showSweetAlert.visible', () => {
        this.click('OK');
      });
      this.waitForElement('.hideSweetAlert');
      this.click('#goToMetWithProtectedTab');
      this.waitForVisible('div[value="metWithProtected"]');
      this.waitForVisible('#metWithProtectedNamesList');
    },
    createClient: function(newName) {
      this.createProtectedName(newName);
      this.click('#makeClient');
      this.waitForElement('#protectNameForm');
      this.click('#submitClientName');
      this.waitToHide('.names__overlay');
      this.waitForVisible('.sweet-alert.showSweetAlert.visible');
      within('.sweet-alert.showSweetAlert.visible', () => {
        this.click('OK');
      });
      this.click('#goToClientsList');
      this.waitForElement('#clientsNamesList');
      this.click('#clientsNamesList .name:nth-of-type(1)');
    },
  });
};
