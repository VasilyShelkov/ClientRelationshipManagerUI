Feature('Authentication', { retries: 3 });

Scenario('User is redirected to login when not logged in', function(I) {
  I.amOnPage('/account/profile');
  I.seeInCurrentUrl('/login');
  I.seeElement('.Login__form');
});

Scenario('User is taken to their profile after logging in by default', function(I) {
  I.login();
  I.waitForElement('.Profile');
  I.seeInCurrentUrl('/account/profile');
  I.see('LOGOUT');
});

[
  '/account/names/unprotected',
  '/account/names/unprotected/add',
  '/account/names/protected',
  '/account/names/metWithProtected',
  '/account/names/clients',
  '/account/users/add'
].forEach(url =>
  Scenario(`User is taken to ${url} after being redirected to login`, function(I) {
    I.login(false, false, url);
    I.waitForElement('.index__content-below-navbar');
    I.seeInCurrentUrl(url);
    I.see('LOGOUT');
  })
);
