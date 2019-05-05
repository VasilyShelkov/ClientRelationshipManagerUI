import notificationMiddleware from './notificationMiddleware';
import * as thirdPartyActions from './thirdPartyActions';

describe('src/app/notificationMiddleware', () => {
  it('calls next with the action', () => {
    const action = { type: 'ANY_ACTION' };
    const next = jest.fn();

    notificationMiddleware({})(next)(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it('does not dispatch anything if not an APOLLO_MUTATION_RESULT', () => {
    const action = { type: 'NOT_APOLLO_MUTATION_RESULT' };
    const dispatchSpy = jest.fn();
    const store = { dispatch: dispatchSpy };

    notificationMiddleware(store)(() => {})(action);

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('does not dispatch anything if APOLLO_MUTATION_RESULT has errors', () => {
    const action = {
      type: thirdPartyActions.APOLLO_MUTATION_RESULT,
      result: { errors: [] },
    };
    const dispatchSpy = jest.fn();
    const store = { dispatch: dispatchSpy };

    notificationMiddleware(store)(() => {})(action);

    expect(dispatchSpy).not.toHaveBeenCalled();
  })

  describe('dispatches success notification', () => {
    const setup = ({ operationName, data }) => {
      const dispatchSpy = jest.fn();
      const store = { dispatch: dispatchSpy };
      const action = {
        type: thirdPartyActions.APOLLO_MUTATION_RESULT,
        operationName,
        result: { data },
      };

      notificationMiddleware(store)(() => {})(action);

      return { dispatchSpy };
    };

    it('when CreateUnprotectedName', () => {
      const firstName = 'first';
      const lastName = 'last';
      const data = {
        addUnprotectedNameToUser: {
          name: { firstName, lastName },
        },
      };

      const showSuccessNotificationAction = 'showSuccessAction';
      jest.spyOn(thirdPartyActions, 'showSuccessNotification')
        .mockImplementation(() => showSuccessNotificationAction)
      const { dispatchSpy } = setup({
        operationName: 'CreateUnprotectedName',
        data,
      });

      expect(dispatchSpy).toHaveBeenCalledWith(showSuccessNotificationAction);
    });

    it('when ProtectName', () => {
      const firstName = 'first';
      const lastName = 'last';
      const data = {
        protectNameToUser: {
          name: { firstName, lastName },
        },
      };

      const showSuccessNotificationAction = 'showSuccessAction';
      jest.spyOn(thirdPartyActions, 'showSuccessNotification')
        .mockImplementation(() => showSuccessNotificationAction)
      const { dispatchSpy } = setup({
        sandbox: this,
        operationName: 'ProtectName',
        data,
      });

      expect(dispatchSpy).toHaveBeenCalledWith(
        showSuccessNotificationAction,
      );
    });

    it('when MetWithProtected', () => {
      const firstName = 'first';
      const lastName = 'last';
      const data = {
        editProtectedName: {
          name: { firstName, lastName },
        },
      };

      const showSuccessNotificationAction = 'showSuccessAction';
      jest.spyOn(thirdPartyActions, 'showSuccessNotification')
        .mockImplementation(() => showSuccessNotificationAction);
      const { dispatchSpy } = setup({
        sandbox: this,
        operationName: 'MetWithProtected',
        data,
      });

      expect(dispatchSpy).toHaveBeenCalledWith(
        showSuccessNotificationAction,
      );
    });

    it('when MakeClient', () => {
      const firstName = 'first';
      const lastName = 'last';
      const data = {
        addClientToUser: {
          name: { firstName, lastName },
        },
      };

      const showSuccessNotificationAction = 'showSuccessAction';
      jest.spyOn(thirdPartyActions, 'showSuccessNotification')
        .mockImplementation(() => showSuccessNotificationAction);
      const { dispatchSpy } = setup({
        sandbox: this,
        operationName: 'MakeClient',
        data,
      });

      expect(dispatchSpy).toHaveBeenCalledWith(
        showSuccessNotificationAction,
      );
    });

    it('when MakeClient', () => {
      const firstName = 'first';
      const lastName = 'last';
      const data = {
        unprotectNameFromUser: {
          name: { firstName, lastName },
        },
      };

      const showSuccessNotificationAction = 'showSuccessAction';
      jest.spyOn(thirdPartyActions, 'showSuccessNotification')
        .mockImplementation(() => showSuccessNotificationAction);
      const { dispatchSpy } = setup({
        sandbox: this,
        operationName: 'UnprotectName',
        data,
      });

      expect(dispatchSpy).toHaveBeenCalledWith(
        showSuccessNotificationAction,
      );
    });
  });
});
