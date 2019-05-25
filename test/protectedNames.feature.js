Feature('Protected names', { retries: 3 });

Scenario('user books a meeting on the protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
    I.click('#bookMeeting');
  });

  I.waitForElement('#protectNameForm');
  I.click('input[name="meetingDay"]');
  const currentDay = await I.createCurrentDay();
  const currentMonth = await I.createCurrentMonth();
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
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee('Book Meeting');
  });
});

Scenario('user books a call on the protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(newProtectedName.firstName);
    I.click('#bookCall');
  });

  I.waitForElement('#protectNameForm');
  const currentDay = await I.createCurrentDay();
  const currentMonth = await I.createCurrentMonth();
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
  I.waitForVisible('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee('Book Call');
  });
});

Scenario('user unprotects a protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToUnprotectedList');
  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  const currentUnprotectedNamesCount = await I.grabTextFrom('#unprotectedNamesCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom('#protectedNamesCount');
  I.click('#unprotectName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.click('OK');
  });

  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  I.see(`${parseInt(currentUnprotectedNamesCount, 10) + 1} Unprotected`);
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

Scenario('user deletes a protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);
  const currentProtectedNamesCount = await I.grabTextFrom('#protectedNamesCount');
  I.click('#deleteName');
  I.waitToHide('.names__overlay');
  I.waitForText(`${parseInt(currentProtectedNamesCount, 10) - 1}/150 Protected`);
  I.waitForVisible('#appNotification');
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newProtectedName.firstName);
    I.dontSee(newProtectedName.lastName);
    I.dontSee(newProtectedName.phone);
  });
});

Scenario('user meets with protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToMetWithProtectedTab');
  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  const currentMetWithProtectedNamesCount = await I.grabTextFrom('#metWithProtectedNamesCount');

  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForVisible('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom('#protectedNamesCount');
  I.click('#metWithProtected');
  I.click('#submitMetWithName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.click('OK');
  });

  I.click('#goToMetWithProtectedTab');
  I.waitForVisible('div[value="metWithProtected"]');
  I.waitForVisible('#metWithProtectedNamesList');
  I.see(`${parseInt(currentMetWithProtectedNamesCount, 10) + 1} Met With Protected Name`);
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

Scenario('user makes the protected name a client with no call or meeting booked', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  const currentClientsCount = await I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom('#protectedNamesCount');

  I.click('#makeClient');
  I.waitForElement('#protectNameForm');
  I.click('#clearCallBooking');
  I.click('#clearMeetingBooking');
  I.click('#submitClientName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.click('OK');
  });

  I.click('#goToClientsList')
  I.waitForElement('#clientsNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  within('#clientsNamesList .name:nth-of-type(1)', () => {
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

Scenario('user makes the protected name a client with a call booked', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  const currentClientsCount = await I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom('#protectedNamesCount');

  I.click('#makeClient');
  const currentDay = await I.createCurrentDay();
  const currentMonth = await I.createCurrentMonth();

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
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.click('OK');
  });

  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  within('#clientsNamesList .name:nth-of-type(1)', () => {
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

Scenario('user makes the protected name a client with a meeting booked', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.waitForElement('#goToClientsList');
  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  const currentClientsCount = await I.grabTextFrom('#clientsCount');

  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#goToProtectedTab');
  I.click('#goToProtectedTab');
  I.waitForVisible('div[value="protected"]');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom('#protectedNamesCount');

  I.click('#makeClient');
  const currentDay = await I.createCurrentDay();
  const currentMonth = await I.createCurrentMonth();

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
    I.see(newProtectedName.firstName);
    I.see(newProtectedName.lastName);
    I.click('OK');
  });

  I.click('#goToClientsList');
  I.waitForElement('#clientsNamesList');
  I.see(`${parseInt(currentClientsCount, 10) + 1} Clients`);
  within('#clientsNamesList .name:nth-of-type(1)', () => {
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
