Feature('Clients');

Scenario('user books a meeting on the client', function* (I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  within('#clientNamesList .name:nth-of-type(1)', () => {
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
  I.waitForText('OK');
  I.click('OK');

  I.wait(1);
  I.click('#submitEditProtectedMeeting');
  I.waitToHide('.names__overlay');
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.dontSee('BOOK MEETING');
  });
});

Scenario('user books a call on the client', function* (I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  within('#clientNamesList .name:nth-of-type(1)', () => {
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
  I.waitForText('OK');
  I.click('OK');

  I.wait(1);
  I.click('#submitEditProtectedCall');
  I.waitToHide('.names__overlay');
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.dontSee('BOOK CALL');
  });
});

Scenario('user unprotects a client', function* (I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  I.waitForElement('#goToUnprotectedList');
  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  const currentUnprotectedNamesCount = yield I.grabTextFrom('#unprotectedNamesCount');

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');
  I.click('#unprotectName');

  I.waitToHide('.names__overlay');
  I.waitForElement('#unprotectedNamesList');
  I.see(`${parseInt(currentUnprotectedNamesCount, 10) + 1} Unprotected`);
  I.waitForVisible('#appNotification');
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(newClient.firstName);
    I.see(newClient.lastName);
    I.see(newClient.phone);
    I.see(newClient.company.name);
  });

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientNamesList');
  I.see(`${parseInt(currentClientsCount, 10) - 1} Clients`);
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newClient.firstName);
    I.dontSee(newClient.lastName);
    I.dontSee(newClient.phone);
  });
});

Scenario('user deletes a client', function* (I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');
  I.click('#deleteName');
  I.waitToHide('.names__overlay');
  I.see(`${parseInt(currentClientsCount, 10) - 1} Clients`);
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newClient.firstName);
    I.dontSee(newClient.lastName);
    I.dontSee(newClient.phone);
  });
});
