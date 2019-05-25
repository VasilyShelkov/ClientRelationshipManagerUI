Feature('Selected Name Company', { retries: 3 });

Scenario('user edits company details for unprotected', async function(I) {
  I.login();
  const newUnprotectedName = await I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const editCompany = await I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('Name', editCompany.name);
    I.fillField('Address', editCompany.address);
    I.fillField('Phone', editCompany.phone);
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

Scenario('user edits company details for protected', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  const editCompany = await I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('Name', editCompany.name);
    I.fillField('Address', editCompany.address);
    I.fillField('Phone', editCompany.phone);
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

Scenario('user edits company details for met with protected', async function(I) {
  I.login();
  const newMetWithProtectedName = await I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const editCompany = await I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('Name', editCompany.name);
    I.fillField('Address', editCompany.address);
    I.fillField('Phone', editCompany.phone);
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

Scenario('user edits company details for client', async function(I) {
  I.login();
  const newClient = await I.createFakeName();
  I.createClient(newClient);

  const editCompany = await I.createFakeCompany();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editCompany');
    I.waitForElement('#StandardForm');
    I.fillField('Name', editCompany.name);
    I.fillField('Address', editCompany.address);
    I.fillField('Phone', editCompany.phone);
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
