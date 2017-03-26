Feature('Selected Name');

Scenario('user edits name details for unprotected', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('firstName', editName.firstName);
    I.fillField('lastName', editName.lastName);
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#unprotectedNamesList');
  I.waitForVisible('#appNotification');
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(editName.firstName);
    I.see(editName.lastName);
    I.see(editName.phone);
  });
});

Scenario('user edits company details for unprotected', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.fillField('name', editCompany.name);
    I.fillField('phone', editCompany.address);
    I.fillField('address', editCompany.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#unprotectedNamesList');
  I.waitForVisible('#appNotification');
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(editCompany.name);
  });

  within('#selectedName', () => {
    I.see(editCompany.name);
    I.see(editCompany.address);
    I.see(editCompany.phone);
  });
});

Scenario('user edits name details for protected', function* (I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits company details for protected', function* (I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.fillField('name', editCompany.name);
    I.fillField('phone', editCompany.address);
    I.fillField('address', editCompany.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(editCompany.name);
  });

  within('#selectedName', () => {
    I.see(editCompany.name);
    I.see(editCompany.address);
    I.see(editCompany.phone);
  });
});

Scenario('user edits name details for met with protected', function* (I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#metWithProtectedNamesList');
  I.waitForVisible('#appNotification');
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits company details for met with protected', function* (I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.fillField('name', editCompany.name);
    I.fillField('phone', editCompany.address);
    I.fillField('address', editCompany.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#metWithProtectedNamesList');
  I.waitForVisible('#appNotification');
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.see(editCompany.name);
  });

  within('#selectedName', () => {
    I.see(editCompany.name);
    I.see(editCompany.address);
    I.see(editCompany.phone);
  });
});

Scenario('user edits name details for client', function* (I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#clientNamesList');
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits company details for client', function* (I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.fillField('name', editCompany.name);
    I.fillField('phone', editCompany.address);
    I.fillField('address', editCompany.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#clientNamesList');
  I.waitForVisible('#appNotification');
  within('#clientNamesList .name:nth-of-type(1)', () => {
    I.see(editCompany.name);
  });

  within('#selectedName', () => {
    I.see(editCompany.name);
    I.see(editCompany.address);
    I.see(editCompany.phone);
  });
});
