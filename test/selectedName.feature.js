Feature('Selected Name');

Scenario('user edits name details for unprotected', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  I.click('#editName');

  const editName = yield I.createFakeName();
  I.fillField('firstName', editName.firstName);
  I.fillField('lastName', editName.lastName);
  I.fillField('phone', editName.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#unprotectedNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
    I.see(editName.firstName);
    I.see(editName.lastName);
    I.see(editName.phone);
  });
});

Scenario('user edits company details for unprotected', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  I.click('#editCompany');

  const editCompany = yield I.createFakeCompany();
  I.fillField('name', editCompany.name);
  I.fillField('phone', editCompany.address);
  I.fillField('address', editCompany.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#unprotectedNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
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

  I.click('#editName');

  const editName = yield I.createFakeName();
  I.fillField('phone', editName.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits company details for protected', function* (I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  I.click('#editCompany');

  const editCompany = yield I.createFakeCompany();
  I.fillField('name', editCompany.name);
  I.fillField('phone', editCompany.address);
  I.fillField('address', editCompany.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
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

  I.click('#editName');

  const editName = yield I.createFakeName();
  I.fillField('phone', editName.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits comapny details for met with protected', function* (I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  I.click('#editCompany');

  const editCompany = yield I.createFakeCompany();
  I.fillField('name', editCompany.name);
  I.fillField('phone', editCompany.address);
  I.fillField('address', editCompany.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#metWithProtectedNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
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

  I.click('#editName');

  const editName = yield I.createFakeName();
  I.fillField('phone', editName.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#clientNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits company details for client', function* (I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  I.click('#editCompany');

  const editCompany = yield I.createFakeCompany();
  I.fillField('name', editCompany.name);
  I.fillField('phone', editCompany.address);
  I.fillField('address', editCompany.phone);
  I.click('#standardSubmit');

  I.waitToHide('.names__overlay');
  I.waitForElement('#clientNamesList');
  I.waitForVisible('#appNotification');
  within('.name:nth-of-type(1)', () => {
    I.see(editCompany.name);
  });

  within('#selectedName', () => {
    I.see(editCompany.name);
    I.see(editCompany.address);
    I.see(editCompany.phone);
  });
});
