Feature('Met with protected names', { retries: 3 });

Scenario('user books a meeting on the met with protected name', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.see(newMetWithProtectedName.firstName);
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
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee('BOOK MEETING');
  });
});

Scenario('user books a call on the met with protected name', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.see(newMetWithProtectedName.firstName);
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
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee('BOOK CALL');
  });
});

Scenario('user unprotects a met with protected name', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  I.waitForElement('#goToUnprotectedList');
  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  const currentUnprotectedNamesCount = yield I.grabTextFrom('#unprotectedNamesCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  const currentMetWithProtectedNamesCount = yield I.grabTextFrom('#metWithProtectedNamesCount');
  I.click('#unprotectName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.click('OK');
  });

  I.waitForElement('#unprotectedNamesList');
  I.see(`${parseInt(currentUnprotectedNamesCount, 10) + 1} Unprotected`);
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.see(newMetWithProtectedName.phone);
    I.see(newMetWithProtectedName.company.name);
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  I.see(`${parseInt(currentMetWithProtectedNamesCount, 10) - 1} Met With Protected`);
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newMetWithProtectedName.firstName);
    I.dontSee(newMetWithProtectedName.lastName);
    I.dontSee(newMetWithProtectedName.phone);
  });
});

Scenario('user deletes a met with protected name', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);
  const currentMetWithProtectedNamesCount = yield I.grabTextFrom('#metWithProtectedNamesCount');
  I.click('#deleteName');
  I.waitToHide('.names__overlay');
  I.see(`${parseInt(currentMetWithProtectedNamesCount, 10) - 1} Met With Protected`);
  I.waitForVisible('#appNotification');
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newMetWithProtectedName.firstName);
    I.dontSee(newMetWithProtectedName.lastName);
    I.dontSee(newMetWithProtectedName.phone);
  });
});

Scenario('user makes the met with protected name a client with no call or meeting booked', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  const currentMetWithProtectedNamesCount = yield I.grabTextFrom('#metWithProtectedNamesCount');

  I.click('#makeClient');
  I.waitForElement('#protectNameForm');
  I.click('#clearCallBooking');
  I.click('#clearMeetingBooking');
  I.click('#submitClientName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.click('OK');
  });

  I.waitForElement('#clientsNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.see(newMetWithProtectedName.phone);
    I.see(newMetWithProtectedName.company.name);
    I.see('BOOK CALL');
    I.see('BOOK MEETING');
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForElement('#metWithProtectedNamesList');
  I.see(`${parseInt(currentMetWithProtectedNamesCount, 10) - 1} Met With Protected`);
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newMetWithProtectedName.firstName);
    I.dontSee(newMetWithProtectedName.lastName);
    I.dontSee(newMetWithProtectedName.phone);
  });
});

Scenario('user makes the met with protected name a client with a call booked', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  const currentMetWithProtectedNamesCount = yield I.grabTextFrom('#metWithProtectedNamesCount');

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
  I.pressKey('Enter');

  I.wait(1);
  I.click('#submitClientName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.click('OK');
  });

  I.waitForElement('#clientsNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.see(newMetWithProtectedName.phone);
    I.see(newMetWithProtectedName.company.name);
    I.dontSee('BOOK CALL');
    I.see('BOOK MEETING');
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  I.see(`${parseInt(currentMetWithProtectedNamesCount, 10) - 1} Met With Protected`);
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newMetWithProtectedName.firstName);
    I.dontSee(newMetWithProtectedName.lastName);
    I.dontSee(newMetWithProtectedName.phone);
  });
});

Scenario('user makes the met with protected name a client with a meeting booked', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  const currentClientsCount = yield I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  const currentMetWithProtectedNamesCount = yield I.grabTextFrom('#metWithProtectedNamesCount');

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
  I.pressKey('Enter');

  I.wait(1);
  I.click('#submitClientName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.click('OK');
  });

  I.waitForElement('#clientsNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.see(newMetWithProtectedName.firstName);
    I.see(newMetWithProtectedName.lastName);
    I.see(newMetWithProtectedName.phone);
    I.see(newMetWithProtectedName.company.name);
    I.see('BOOK CALL');
    I.dontSee('BOOK MEETING');
  });

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  I.see(`${parseInt(currentMetWithProtectedNamesCount, 10) - 1} Met With Protected`);
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newMetWithProtectedName.firstName);
    I.dontSee(newMetWithProtectedName.lastName);
    I.dontSee(newMetWithProtectedName.phone);
  });
});
