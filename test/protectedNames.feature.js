Feature('Protected names', { retries: 3 });

Scenario('user books a meeting on the protected name', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
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
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee('Book Meeting');
  });
});

Scenario('user books a call on the protected name', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
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
  I.waitForVisible('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee('Book Call');
  });
});

Scenario('user unprotects a protected name', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToUnprotectedList');
  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  const currentUnprotectedNamesCount = yield I.grabTextFrom('#unprotectedNamesCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = yield I.grabTextFrom('#protectedNamesCount');
  I.click('#unprotectName');

  I.waitToHide('.names__overlay');
  I.waitForElement('#unprotectedNamesList');
  I.see(`${parseInt(currentUnprotectedNamesCount, 10) + 1} Unprotected`);
  I.waitForVisible('#appNotification');
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.see(newProtectedName.phone);
    I.see(newProtectedName.company.name);
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) - 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newProtectedName.firstName);
    I.dontSee(newProtectedName.lastName);
    I.dontSee(newProtectedName.phone);
  });
});

Scenario('user deletes a protected name', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);
  const currentProtectedNamesCount = yield I.grabTextFrom('#protectedNamesCount');
  I.click('#deleteName');
  I.waitToHide('.names__overlay');
  I.see(`${parseInt(currentProtectedNamesCount, 10) - 1}/150 Protected`);
  I.waitForVisible('#appNotification');
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newProtectedName.firstName);
    I.dontSee(newProtectedName.lastName);
    I.dontSee(newProtectedName.phone);
  });
});

Scenario('user meets with protected name', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  const currentMetWithProtectedNamesCount = yield I.grabTextFrom('#metWithProtectedNamesCount');

  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForVisible('#protectedNamesList');
  const currentProtectedNamesCount = yield I.grabTextFrom('#protectedNamesCount');
  I.click('#metWithProtected');

  I.click('#submitMetWithName');
  I.waitToHide('.names__overlay');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  I.see(`${parseInt(currentMetWithProtectedNamesCount, 10) + 1} Met With Protected Name`);
  I.waitForVisible('#appNotification');
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.see(newProtectedName.phone);
    I.see(newProtectedName.company.name);
  });

  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForVisible('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) - 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newProtectedName.firstName);
    I.dontSee(newProtectedName.lastName);
    I.dontSee(newProtectedName.phone);
  });
});

Scenario('user makes the protected name a client with no call or meeting booked', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = yield I.grabTextFrom('#protectedNamesCount');

  I.click('#makeClient');
  I.waitForElement('#protectNameForm');

  I.click('#clearCallBooking');
  I.click('#clearMeetingBooking');

  I.click('#submitClientName');
  I.waitToHide('.names__overlay');
  I.waitForElement('#clientNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.see(newProtectedName.phone);
    I.see(newProtectedName.company.name);
    I.see('BOOK CALL');
    I.see('BOOK MEETING');
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) - 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newProtectedName.firstName);
    I.dontSee(newProtectedName.lastName);
    I.dontSee(newProtectedName.phone);
  });
});

Scenario('user makes the protected name a client with a call booked', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = yield I.grabTextFrom('#protectedNamesCount');

  I.click('#makeClient');
  const currentDay = yield I.createCurrentDay();
  const currentMonth = yield I.createCurrentMonth();

  I.waitForElement('#protectNameForm');
  I.click('input[name="callDay"]');
  I.waitForText(currentMonth);
  I.click(currentDay);

  I.wait(1);
  I.waitForEnabled('input[name="callTime"]');
  I.click('input[name="callTime"]');
  I.waitForText('OK');
  I.click('OK');

  I.wait(1);
  I.click('#submitClientName');
  I.waitToHide('.names__overlay');
  I.waitForElement('#clientNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.see(newProtectedName.phone);
    I.see(newProtectedName.company.name);
    I.dontSee('BOOK CALL');
    I.see('BOOK MEETING');
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) - 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newProtectedName.firstName);
    I.dontSee(newProtectedName.lastName);
    I.dontSee(newProtectedName.phone);
  });
});

Scenario('user makes the protected name a client with a meeting booked', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = yield I.grabTextFrom('#protectedNamesCount');

  I.click('#makeClient');
  const currentDay = yield I.createCurrentDay();
  const currentMonth = yield I.createCurrentMonth();

  I.waitForElement('#protectNameForm');
  I.click('input[name="meetingDay"]');
  I.waitForText(currentMonth);
  I.click(currentDay);

  I.wait(1);
  I.waitForEnabled('input[name="meetingTime"]');
  I.click('input[name="meetingTime"]');
  I.waitForText('OK');
  I.click('OK');

  I.wait(1);
  I.click('#submitClientName');
  I.waitToHide('.names__overlay');
  I.waitForElement('#clientNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.see(newProtectedName.phone);
    I.see(newProtectedName.company.name);
    I.see('BOOK CALL');
    I.dontSee('BOOK MEETING');
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) - 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newProtectedName.firstName);
    I.dontSee(newProtectedName.lastName);
    I.dontSee(newProtectedName.phone);
  });
});
