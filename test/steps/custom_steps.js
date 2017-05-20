const getTestUserDetails = require('./userAccount');

module.exports = function() {
  return actor({
    login: function(email, password) {
      const testUser = getTestUserDetails(process.env.NODE_ENV);
      let loginEmail = testUser.email;
      let loginPassword = testUser.password;
      if (email) {
        loginEmail = email;
      }
      if (password) {
        loginPassword = password;
      }
      this.amOnPage('/login');
      this.fillField('email', loginEmail);
      this.fillField('password', loginPassword);
      this.click('Sign in');
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
      this.seeInCurrentUrl(`account/users/${newUser.firstName.toLowerCase()}${newUser.lastName}/profile`);
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
      this.fillField('companyName', newName.company.name);
      this.fillField('companyAddress', newName.company.address);
      this.fillField('companyPhone', newName.company.phone);
      this.click('Save');

      this.waitForElement('#unprotectedNamesList');
    },
    createProtectedName: function(newName) {
      this.createNewUnprotectedName(newName);
      this.click('#protectName');
      this.waitForElement('#protectNameForm');
      this.click('#submitProtectName');
      this.waitToHide('.names__overlay');
      this.waitForElement('#protectedNamesList');
    },
    createMetWithProtectedName: function(newName) {
      this.createProtectedName(newName);
      this.click('#metWithProtected');
      this.click('#submitMetWithName');
      this.waitToHide('.names__overlay');
      this.waitForVisible('div[value="metWithProtected"]');
      this.waitForVisible('#metWithProtectedNamesList');
    },
    createClient: function(newName) {
      this.createProtectedName(newName);
      this.click('#makeClient');
      this.waitForElement('#protectNameForm');
      this.click('#submitClientName');
      this.waitToHide('.names__overlay');
      this.waitForElement('#clientsNamesList');
    }
  });
};
