import notificationMiddleware from './notificationMiddleware';
import * as thirdPartyActions from './thirdPartyActions';

describe('src/app/notificationMiddleware', () => {
  it(
    'calls next with the action',
    sinon.test(function() {
      const action = { type: 'ANY_ACTION' };
      const next = this.spy();

      notificationMiddleware({})(next)(action);

      expect(next).to.have.been.calledWith(action);
    })
  );

  it(
    'does not dispatch anything if not an APOLLO_MUTATION_RESULT',
    sinon.test(function() {
      const action = { type: 'NOT_APOLLO_MUTATION_RESULT' };
      const dispatchSpy = this.spy();
      const store = { dispatch: dispatchSpy };

      notificationMiddleware(store)(() => {})(action);

      expect(dispatchSpy).to.not.have.been.called;
    })
  );

  it(
    'does not dispatch anything if APOLLO_MUTATION_RESULT has errors',
    sinon.test(function() {
      const action = { type: thirdPartyActions.APOLLO_MUTATION_RESULT, result: { errors: [] } };
      const dispatchSpy = this.spy();
      const store = { dispatch: dispatchSpy };

      notificationMiddleware(store)(() => {})(action);

      expect(dispatchSpy).to.not.have.been.called;
    })
  );

  describe('dispatches success notification', () => {
    const setup = ({ sandbox, operationName, data }) => {
      const dispatchSpy = sandbox.spy();
      const store = { dispatch: dispatchSpy };
      const action = {
        type: thirdPartyActions.APOLLO_MUTATION_RESULT,
        operationName,
        result: { data }
      };

      notificationMiddleware(store)(() => {})(action);

      return { dispatchSpy };
    };

    it(
      'when CreateUnprotectedName',
      sinon.test(function() {
        const firstName = 'first';
        const lastName = 'last';
        const data = {
          addUnprotectedNameToUser: {
            name: { firstName, lastName }
          }
        };

        const showSuccessNotificationAction = 'showSuccessAction';
        this.mock(thirdPartyActions)
          .expects('showSuccessNotification')
          .withArgs({
            title: 'Created unprotected',
            firstName,
            lastName
          })
          .returns(showSuccessNotificationAction);
        const { dispatchSpy } = setup({ sandbox: this, operationName: 'CreateUnprotectedName', data });

        expect(dispatchSpy).to.have.been.calledWith(showSuccessNotificationAction);
      })
    );

    it(
      'when ProtectName',
      sinon.test(function() {
        const firstName = 'first';
        const lastName = 'last';
        const data = {
          protectNameToUser: {
            name: { firstName, lastName }
          }
        };

        const showSuccessNotificationAction = 'showSuccessAction';
        this.mock(thirdPartyActions)
          .expects('showSuccessNotification')
          .withArgs({
            title: 'Protected name',
            firstName,
            lastName
          })
          .returns(showSuccessNotificationAction);
        const { dispatchSpy } = setup({ sandbox: this, operationName: 'ProtectName', data });

        expect(dispatchSpy).to.have.been.calledWith(showSuccessNotificationAction);
      })
    );

    it(
      'when MetWithProtected',
      sinon.test(function() {
        const firstName = 'first';
        const lastName = 'last';
        const data = {
          editProtectedName: {
            name: { firstName, lastName }
          }
        };

        const showSuccessNotificationAction = 'showSuccessAction';
        this.mock(thirdPartyActions)
          .expects('showSuccessNotification')
          .withArgs({
            title: 'Met with protected',
            firstName,
            lastName
          })
          .returns(showSuccessNotificationAction);
        const { dispatchSpy } = setup({ sandbox: this, operationName: 'MetWithProtected', data });

        expect(dispatchSpy).to.have.been.calledWith(showSuccessNotificationAction);
      })
    );

    it(
      'when MakeClient',
      sinon.test(function() {
        const firstName = 'first';
        const lastName = 'last';
        const data = {
          addClientToUser: {
            name: { firstName, lastName }
          }
        };

        const showSuccessNotificationAction = 'showSuccessAction';
        this.mock(thirdPartyActions)
          .expects('showSuccessNotification')
          .withArgs({
            title: 'Congrats on the new client',
            firstName,
            lastName
          })
          .returns(showSuccessNotificationAction);
        const { dispatchSpy } = setup({ sandbox: this, operationName: 'MakeClient', data });

        expect(dispatchSpy).to.have.been.calledWith(showSuccessNotificationAction);
      })
    );

    it(
      'when MakeClient',
      sinon.test(function() {
        const firstName = 'first';
        const lastName = 'last';
        const data = {
          unprotectNameFromUser: {
            name: { firstName, lastName }
          }
        };

        const showSuccessNotificationAction = 'showSuccessAction';
        this.mock(thirdPartyActions)
          .expects('showSuccessNotification')
          .withArgs({
            title: 'Unprotected name',
            firstName,
            lastName
          })
          .returns(showSuccessNotificationAction);
        const { dispatchSpy } = setup({ sandbox: this, operationName: 'UnprotectName', data });

        expect(dispatchSpy).to.have.been.calledWith(showSuccessNotificationAction);
      })
    );
  });
});
