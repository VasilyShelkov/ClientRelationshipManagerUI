Feature('Selected Name Comments', { retries: 3 });

Scenario('Add private comment for an Unprotected name', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
  });
});

Scenario('Add public comment for an Unprotected name', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Edit comment for an Unprotected name', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = yield I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Delete comment for an Unprotected name', function* (I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
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

Scenario('Add private comment for an Protected name', function* (I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
  });
});

Scenario('Add public comment for an Protected name', function* (I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Edit comment for an Protected name', function* (I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = yield I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Delete comment for an Protected name', function* (I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
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

Scenario('Add private comment for a Met With Protected name', function* (I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
  });
});

Scenario('Add public comment for a Met With Protected name', function* (I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Edit comment for a Met With Protected name', function* (I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = yield I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Delete comment for a Met With Protected name', function* (I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
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

Scenario('Add private comment for a Client', function* (I) {
  I.login();
  const newClientName = yield I.createFakeName();
  I.createClient(newClientName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
  });
});

Scenario('Add public comment for a Client', function* (I) {
  I.login();
  const newClientName = yield I.createFakeName();
  I.createClient(newClientName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  I.click('#name-comments #addComment');

  within('.StandardForm', () => {
    I.fillField('text', newComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Edit comment for a Client', function* (I) {
  I.login();
  const newClientName = yield I.createFakeName();
  I.createClient(newClientName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  const editedComment = yield I.createFakeComment();
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__private');
    I.click('#edit-or-delete-comment');
  });

  I.click('#edit-comment');
  within('#name-comments .Comment', () => {
    I.waitForElement('.StandardForm');
    I.fillField('text', editedComment);
    I.click('#name-visibility-field');
  });

  I.click('#public-comment-visibility-choice');
  I.wait(1);
  I.click('.StandardForm #standardSubmit[type="submit"]');

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
  });

  I.click('#createNewUser');
  I.waitForText('Add a new member to the team...');
  const newUser = yield I.createFakeUser();
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
    I.see('Vasily Shelkov');
    I.see(editedComment);
    I.see('a few seconds ago');
    I.seeElement('.Comment__visibility__public');
    I.dontSeeElement('#edit-or-delete-comment');
  });
});

Scenario('Delete comment for a Client', function* (I) {
  I.login();
  const newClientName = yield I.createFakeName();
  I.createClient(newClientName);

  const newComment = yield I.createFakeComment();
  I.waitForVisible('#selectedName');
  I.waitForElement('#name-comments');
  within('#name-comments', () => {
    I.click('#addComment');
    I.fillField('text', newComment);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitForVisible('#appNotification');
  I.waitForElement('.Comment');
  within('#name-comments .Comment', () => {
    I.see('Me');
    I.see(newComment);
    I.see('a few seconds ago');
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
