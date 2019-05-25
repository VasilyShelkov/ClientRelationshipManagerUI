Feature('Unprotected names', { retries: 3 });

Scenario('user creates a new name', async function(I) {
  I.login();
  I.waitForElement('#goToUnprotectedList');
  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  const currentUnprotectedNamesCount = await I.grabTextFrom(
    '#unprotectedNamesCount',
  );
  I.waitForElement('#unprotectedNamesList');
  I.click('#createUnprotectedName');

  const newName = await I.createFakeName();
  I.waitForVisible('.StandardForm');
  I.fillField('firstName', newName.firstName);
  I.fillField('lastName', newName.lastName);
  I.fillField('phone', newName.phone);
  I.fillField('input[autocomplete="off"]', newName.company.name);
  I.fillField('companyAddress', newName.company.address);
  I.fillField('companyPhone', newName.company.phone);
  I.click('Save');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.click('OK');
  });

  I.waitForElement('#unprotectedNamesList');
  I.see(`${parseInt(currentUnprotectedNamesCount, 10) + 1} Unprotected`);

  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.see(newName.phone);
    I.see(newName.company.name);
  });
});

Scenario('user deletes an unprotected name', async function(I) {
  I.login();
  const newName = await I.createFakeName();
  I.createNewUnprotectedName(newName);
  I.waitForElement('#unprotectedNamesList');
  const currentUnprotectedNamesCount = await I.grabTextFrom(
    '#unprotectedNamesCount',
  );
  I.click('#deleteName');
  I.waitToHide('.names__overlay');
  I.waitForText(`${parseInt(currentUnprotectedNamesCount, 10) - 1} Unprotected`);
  I.waitForVisible('#appNotification');
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newName.firstName);
    I.dontSee(newName.lastName);
    I.dontSee(newName.phone);
  });
});

Scenario('user protects an unprotected name', async function(I) {
  I.login();
  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForVisible('div[value="protected"]');
  I.waitForVisible('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom(
    '#protectedNamesCount',
  );

  const newName = await I.createFakeName();
  I.createNewUnprotectedName(newName);
  const currentUnprotectedNamesCount = await I.grabTextFrom(
    '#unprotectedNamesCount',
  );
  I.click('#protectName');
  I.waitForElement('#protectNameForm');
  I.click('#submitProtectName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.click('OK');
  });

  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) + 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.see(newName.phone);
    I.see(newName.company.name);
    I.see('BOOK CALL');
    I.see('BOOK MEETING');
  });

  I.waitForElement('#goToUnprotectedList');
  I.click('#goToUnprotectedList');
  I.waitForElement('#unprotectedNamesList');
  I.see(`${parseInt(currentUnprotectedNamesCount, 10) - 1} Unprotected`);
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.dontSee(newName.firstName);
    I.dontSee(newName.lastName);
    I.dontSee(newName.phone);
    I.dontSee(newName.company.name);
  });
});

Scenario('user protects an unprotected name with call booked', async function(I) {
  I.login();
  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom(
    '#protectedNamesCount',
  );

  const newName = await I.createFakeName();
  I.createNewUnprotectedName(newName);
  I.click('#protectName');
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
  I.click('#submitProtectName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.click('OK');
  });

  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) + 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.see(newName.phone);
    I.see(newName.company.name);
    I.dontSee('BOOK CALL');
    I.see('BOOK MEETING');
  });
});

Scenario('user protects an unprotected name with meeting booked', async function(I) {
  I.login();
  I.waitForElement('#goToProtectedList');
  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  const currentProtectedNamesCount = await I.grabTextFrom(
    '#protectedNamesCount',
  );

  const newName = await I.createFakeName();
  I.createNewUnprotectedName(newName);
  I.click('#protectName');
  I.waitForElement('#protectNameForm');

  const currentDay = await I.createCurrentDay();
  const currentMonth = await I.createCurrentMonth();
  I.click('input[name="meetingDay"]');
  I.waitForText(currentMonth);
  I.click(currentDay);

  I.wait(1);
  I.waitForEnabled('input[name="meetingTime"]');
  I.click('input[name="meetingTime"]');
  I.pressKey('Enter');

  I.wait(1);
  I.click('#submitProtectName');
  I.waitToHide('.names__overlay');

  I.waitForVisible('.sweet-alert.showSweetAlert.visible');
  within('.sweet-alert.showSweetAlert.visible', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.click('OK');
  });

  I.click('#goToProtectedList');
  I.waitForElement('#protectedNamesList');
  I.see(`${parseInt(currentProtectedNamesCount, 10) + 1}/150 Protected`);
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(newName.firstName);
    I.see(newName.lastName);
    I.see(newName.phone);
    I.see(newName.company.name);
    I.see('BOOK CALL');
    I.dontSee('BOOK MEETING');
  });
});

Scenario(
  'user protects an unprotected name with call booked and meeting booked',
  async function(I) {
    I.login();
    I.waitForElement('#goToProtectedList');
    I.click('#goToProtectedList');
    I.waitForElement('#protectedNamesList');
    const currentProtectedNamesCount = await I.grabTextFrom(
      '#protectedNamesCount',
    );

    const newName = await I.createFakeName();
    I.createNewUnprotectedName(newName);
    I.click('#protectName');
    I.waitForElement('#protectNameForm');

    const currentDay = await I.createCurrentDay();
    const currentMonth = await I.createCurrentMonth();
    I.click('input[name="callDay"]');
    I.waitForText(currentMonth);
    I.click(currentDay);

    I.waitForEnabled('input[name="callTime"]');
    I.wait(1);
    I.click('input[name="callTime"]');
    I.pressKey('Enter');

    I.wait(1);
    I.click('input[name="meetingDay"]');
    I.waitForText(currentMonth);
    I.click(currentDay);

    I.waitForEnabled('input[name="meetingTime"]');
    I.wait(1);
    I.click('input[name="meetingTime"]');
    I.pressKey('Enter');

    I.wait(1);
    I.click('#submitProtectName');
    I.waitToHide('.names__overlay');

    I.waitForVisible('.sweet-alert.showSweetAlert.visible');
    within('.sweet-alert.showSweetAlert.visible', () => {
      I.see(newName.firstName);
      I.see(newName.lastName);
      I.click('OK');
    });

    I.click('#goToProtectedList');
    I.waitForElement('#protectedNamesList');
    I.see(`${parseInt(currentProtectedNamesCount, 10) + 1}/150 Protected`);
    within('#protectedNamesList .name:nth-of-type(1)', () => {
      I.see(newName.firstName);
      I.see(newName.lastName);
      I.see(newName.phone);
      I.see(newName.company.name);
      I.dontSee('BOOK CALL');
      I.dontSee('BOOK MEETING');
    });
  },
);

Scenario(
  'user protects an unprotected name after clearing call booked and meeting booked',
  async function(I) {
    I.login();
    I.waitForElement('#goToProtectedList');
    I.click('#goToProtectedList');
    I.waitForElement('#protectedNamesList');
    const currentProtectedNamesCount = await I.grabTextFrom(
      '#protectedNamesCount',
    );

    const newName = await I.createFakeName();
    I.createNewUnprotectedName(newName);
    I.click('#protectName');
    I.waitForElement('#protectNameForm');

    const currentDay = await I.createCurrentDay();
    const currentMonth = await I.createCurrentMonth();
    I.click('input[name="callDay"]');
    I.waitForText(currentMonth);
    I.click(currentDay);

    I.waitForEnabled('input[name="callTime"]');
    I.wait(1);
    I.click('input[name="callTime"]');
    I.pressKey('Enter');

    I.wait(1);
    I.click('input[name="meetingDay"]');
    I.waitForText(currentMonth);
    I.click(currentDay);

    I.waitForEnabled('input[name="meetingTime"]');
    I.wait(1);
    I.click('input[name="meetingTime"]');
    I.pressKey('Enter');

    I.wait(1);
    I.click('#clearCallBooking');
    I.click('#clearMeetingBooking');

    I.click('#submitProtectName');
    I.waitToHide('.names__overlay');

    I.waitForVisible('.sweet-alert.showSweetAlert.visible');
    within('.sweet-alert.showSweetAlert.visible', () => {
      I.see(newName.firstName);
      I.see(newName.lastName);
      I.click('OK');
    });

    I.click('#goToProtectedList');
    I.waitForElement('#protectedNamesList');
    I.see(`${parseInt(currentProtectedNamesCount, 10) + 1}/150 Protected`);
    within('#protectedNamesList .name:nth-of-type(1)', () => {
      I.see(newName.firstName);
      I.see(newName.lastName);
      I.see(newName.phone);
      I.see(newName.company.name);
      I.see('BOOK CALL');
      I.see('BOOK MEETING');
    });
  },
);
