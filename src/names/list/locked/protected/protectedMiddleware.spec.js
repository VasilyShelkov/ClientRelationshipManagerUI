import protectedMiddleware from './protectedMiddleware';
import { CHANGE_SHOWN_PROTECTED_LIST } from '../../nameListActions';

describe('src/names/list/locked/protected', () => {
  it('calls next on the action', () => {
    const next = jest.fn();
    const store = {};
    const action = {
      type: 'GENERIC_ACTION',
    };

    protectedMiddleware(store)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it('dispatches change shown action when the url contains metWithProtected', () => {
    const dispatch = jest.fn();
    const store = { dispatch };
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: { pathname: '/metWithProtected' },
    };

    protectedMiddleware(store)(() => {})(action);

    expect(dispatch).toHaveBeenCalledWith({
      type: CHANGE_SHOWN_PROTECTED_LIST,
      listToShow: 'metWithProtected',
    });
  });

  it('does not dispatch anything if the url does not contain metWithProtected', () => {
    const dispatch = jest.fn();
    const store = { dispatch };
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: { pathname: '/unknownUrl' },
    };

    protectedMiddleware(store)(() => {})(action);

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch anything if the action is not a LOCATION_CHANGE but url is correct', () => {
    const dispatch = jest.fn();
    const store = { dispatch };
    const action = {
      type: 'RANDOM_ACTION',
      payload: { pathname: '/metWithProtected' },
    };

    protectedMiddleware(store)(() => {})(action);

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch anything if the action is not a LOCATION_CHANGE and url is not metWithProtected', () => {
    const dispatch = jest.fn();
    const store = { dispatch };
    const action = {
      type: 'RANDOM_ACTION',
      payload: { pathname: '/unknownUrl' },
    };

    protectedMiddleware(store)(() => {})(action);

    expect(dispatch).not.toHaveBeenCalled();
  });
});
