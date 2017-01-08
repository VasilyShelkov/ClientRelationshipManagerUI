const defaultUser = require('./userAccount').defaultUser;

module.exports = function () {
  return actor({
    login: function () {
      this.amOnPage('/login');
      this.fillField('email', defaultUser);
      this.fillField('password', 'test1234');
      this.click('Sign in');
    }
  });
};
