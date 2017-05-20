Feature('Selected Name Company', { retries: 3 });

Scenario('user edits company details for unprotected', function*(I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('name', editCompany.name);
    I.fillField('address', editCompany.address);
    I.fillField('phone', editCompany.phone);
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

Scenario('user edits company details for protected', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('name', editCompany.name);
    I.fillField('address', editCompany.address);
    I.fillField('phone', editCompany.phone);
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

Scenario('user edits company details for met with protected', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('name', editCompany.name);
    I.fillField('address', editCompany.address);
    I.fillField('phone', editCompany.phone);
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

Scenario('user edits company details for client', function*(I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  const editCompany = yield I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('name', editCompany.name);
    I.fillField('address', editCompany.address);
    I.fillField('phone', editCompany.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#clientsNamesList');
  I.waitForVisible('#appNotification');
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.see(editCompany.name);
  });

  within('#selectedName', () => {
    I.see(editCompany.name);
    I.see(editCompany.address);
    I.see(editCompany.phone);
  });
});
