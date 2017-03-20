const defaultUser = require('./userAccount').defaultUser;

module.exports = function () {
  return actor({
    login: function (email, password) {
      let loginEmail = defaultUser;
      let loginPassword = 'test1234';
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
    createNewUser: function (newUser) {
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
        `account/users/${newUser.firstName.toLowerCase()}${newUser.lastName}/profile`
      );
    }
  });
};
