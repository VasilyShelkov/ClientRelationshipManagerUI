Feature('Authentication');

Scenario('User is redirected to login when not logged in', (I) => {
  I.amOnPage('/login');

  I.seeInCurrentUrl('/login');
  I.seeElement('.Login__form');
});
