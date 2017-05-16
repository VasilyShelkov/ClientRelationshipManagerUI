import protectedMiddleware from './protectedMiddleware';
import { CHANGE_SHOWN_PROTECTED_LIST } from '../../nameListActions';

describe('src/names/list/locked/protected', () => {
  it(
    'calls next on the action',
    sinon.test(function() {
      const next = this.spy();
      const store = {};
      const action = {
        type: 'GENERIC_ACTION'
      };

      protectedMiddleware(store)(next)(action);

      expect(next).to.have.been.calledWith(action);
    })
  );

  it(
    'dispatches change shown action when the url contains metWithProtected',
    sinon.test(function() {
      const dispatch = this.spy();
      const store = { dispatch };
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: { pathname: '/metWithProtected' }
      };

      protectedMiddleware(store)(() => {})(action);

      expect(dispatch).to.have.been.calledWith({ type: CHANGE_SHOWN_PROTECTED_LIST, listToShow: 'metWithProtected' });
    })
  );

  it(
    'does not dispatch anything if the url does not contain metWithProtected',
    sinon.test(function() {
      const dispatch = this.spy();
      const store = { dispatch };
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: { pathname: '/unknownUrl' }
      };

      protectedMiddleware(store)(() => {})(action);

      expect(dispatch).to.not.have.been.called;
    })
  );

  it(
    'does not dispatch anything if the action is not a LOCATION_CHANGE but url is correct',
    sinon.test(function() {
      const dispatch = this.spy();
      const store = { dispatch };
      const action = {
        type: 'RANDOM_ACTION',
        payload: { pathname: '/metWithProtected' }
      };

      protectedMiddleware(store)(() => {})(action);

      expect(dispatch).to.not.have.been.called;
    })
  );

  it(
    'does not dispatch anything if the action is not a LOCATION_CHANGE and url is not metWithProtected',
    sinon.test(function() {
      const dispatch = this.spy();
      const store = { dispatch };
      const action = {
        type: 'RANDOM_ACTION',
        payload: { pathname: '/unknownUrl' }
      };

      protectedMiddleware(store)(() => {})(action);

      expect(dispatch).to.not.have.been.called;
    })
  );
});
