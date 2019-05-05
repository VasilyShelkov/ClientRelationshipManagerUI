Feature('Selected Name Comments', { retries: 3 });

xScenario('Add private comment for an Unprotected name', async function(I) {
  I.login();
  const newUnprotectedName = await I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
  });
});

xScenario('Add public comment for an Unprotected name', async function(I) {
  I.login();
  const newUnprotectedName = await I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newUnprotectedName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Edit comment for an Unprotected name', async function(I) {
  I.login();
  const newUnprotectedName = await I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = await I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newUnprotectedName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Delete comment for an Unprotected name', async function(I) {
  I.login();
  const newUnprotectedName = await I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.waitForVisible('#delete-comment');
  I.click('#delete-comment');
  I.waitForVisible('#appNotification');
  I.wait(1);
  within('#name-comments', () => {
    I.dontSeeElement('.Comment');
  });
});

xScenario('Add private comment for an Protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
  });
});

xScenario('Add public comment for an Protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newProtectedName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Edit comment for a Protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = await I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newProtectedName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Delete comment for a Protected name', async function(I) {
  I.login();
  const newProtectedName = await I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.waitForVisible('#delete-comment');
  I.click('#delete-comment');
  I.waitForVisible('#appNotification');
  I.wait(1);
  within('#name-comments', () => {
    I.dontSee(newComment);
  });
});

xScenario('Add private comment for a Met With Protected name', async function(I) {
  I.login();
  const newMetWithProtectedName = await I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
  });
});

xScenario('Add public comment for a Met With Protected name', async function(I) {
  I.login();
  const newMetWithProtectedName = await I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newMetWithProtectedName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Edit comment for a Met With Protected name', async function(I) {
  I.login();
  const newMetWithProtectedName = await I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = await I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newMetWithProtectedName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Delete comment for a Met With Protected name', async function(I) {
  I.login();
  const newMetWithProtectedName = await I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.waitForVisible('#delete-comment');
  I.click('#delete-comment');
  I.waitForVisible('#appNotification');
  I.wait(1);
  within('#name-comments', () => {
    I.dontSee(newComment);
  });
});

xScenario('Add private comment for a Client', async function(I) {
  I.login();
  const newClientName = await I.createFakeName();
  I.createClient(newClientName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
  });
});

xScenario('Add public comment for a Client', async function(I) {
  I.login();
  const newClientName = await I.createFakeName();
  I.createClient(newClientName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newClientName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Edit comment for a Client', async function(I) {
  I.login();
  const newClientName = await I.createFakeName();
  I.createClient(newClientName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = await I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = await I.createFakeUser();
  I.fillField('firstName', newUser.firstName);
  I.fillField('lastName', newUser.lastName);
  I.fillField('email', newUser.email);
  I.fillField('phone', newUser.phone);
  I.fillField('password', newUser.password);
  I.fillField('confirmPassword', newUser.password);
  I.click('Save');
  I.waitForElement('.Form__notification');

  I.click('Logout');
  I.login(newUser.email, 'test1234');
  I.waitForElement('.Profile');
  I.createNewUnprotectedName(newClientName);

  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments .Comment', () => {
    I.see('Vasily Shelkov', '.Comment__header__container__text');
    I.see(editedComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

xScenario('Delete comment for a Client', async function(I) {
  I.login();
  const newClientName = await I.createFakeName();
  I.createClient(newClientName);

  const newComment = await I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.waitForText(newComment, 5, 'textarea[name="text"]');
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me', '.Comment__header__container__text');
    I.see(newComment, '.Comment__content');
    I.see('a few seconds ago', '.Comment__time');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.waitForVisible('#delete-comment');
  I.click('#delete-comment');
  I.waitForVisible('#appNotification');
  I.wait(1);
  within('#name-comments', () => {
    I.dontSee(newComment);
  });
});
