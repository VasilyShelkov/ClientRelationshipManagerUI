Feature('Clients', { retries: 3 });

Scenario('user books a meeting on the client', function*(I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.see(newClient.firstName);
    I.see('BOOK MEETING');
    I.click('#bookMeeting');
  });

  I.waitForElement('#protectNameForm');
  I.click('input[name="meetingDay"]');
  const currentDay = yield I.createCurrentDay();
  const currentMonth = yield I.createCurrentMonth();
  I.waitForText(currentMonth);
  I.click(currentDay);

  I.wait(1);
  I.waitForEnabled('input[name="meetingTime"]');
  I.click('input[name="meetingTime"]');
  I.pressKey('Enter');

  I.wait(1);
  I.click('#submitEditProtectedMeeting');
  I.waitToHide('.names__overlay');
  I.waitForVisible('#appNotification');
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.dontSee('BOOK MEETING');
  });
});

Scenario('user books a call on the client', function*(I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.see(newClient.firstName);
    I.see('BOOK CALL');
    I.click('#bookCall');
  });

  I.waitForElement('#protectNameForm');
  const currentDay = yield I.createCurrentDay();
  const currentMonth = yield I.createCurrentMonth();
  I.click('input[name="callDay"]');
  I.waitForText(currentMonth);
  I.click(currentDay);

  I.wait(1);
  I.waitForEnabled('input[name="callTime"]');
  I.click('input[name="callTime"]');
  I.pressKey('Enter');

  I.wait(1);
  I.click('#submitEditProtectedCall');
  I.waitToHide('.names__overlay');
  I.waitForVisible('#appNotification');
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.dontSee('BOOK CALL');
  });
});

Scenario('user unprotects a client', function*(I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  I.waitForElement('#goToUnprotectedList');
  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  const currentUnprotectedNamesCount = yield I.grabTextFrom(
    '#unprotectedNamesCount',
  );

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');
  I.click('#unprotectName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newClient.firstName);
    I.see(newClient.lastName);
    I.click('OK');
  });

  I.waitForElement('#unprotectedNamesList');
  I.see(`${parseInt(currentUnprotectedNamesCount, 10) + 1} Unprotected`);
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(newClient.firstName);
    I.see(newClient.lastName);
    I.see(newClient.phone);
    I.see(newClient.company.name);
  });

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  I.see(`${parseInt(currentClientsCount, 10) - 1} Clients`);
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newClient.firstName);
    I.dontSee(newClient.lastName);
    I.dontSee(newClient.phone);
  });
});

Scenario('user deletes a client', function*(I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');
  I.click('#deleteName');
  I.waitToHide('.names__overlay');
  I.see(`${parseInt(currentClientsCount, 10) - 1} Clients`);
  I.waitForVisible('#appNotification');
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newClient.firstName);
    I.dontSee(newClient.lastName);
    I.dontSee(newClient.phone);
  });
});
