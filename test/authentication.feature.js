Feature('Authentication', { retries: 3 });

Scenario('User is redirected to login when not logged in', (I) => {
  I.amOnPage('/account/profile');
  I.seeInCurrentUrl('/login');
  I.seeElement('.Login__form');
});

Scenario('User is taken to their profile after logging in', (I) => {
  I.login();
  I.waitForElement('.Profile');
  I.seeInCurrentUrl('/account/profile');
  I.see('LOGOUT');
});
