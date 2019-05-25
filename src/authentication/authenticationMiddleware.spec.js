import { push } from 'react-router-redux';
import authenticationMiddleware from './authenticationMiddleware';

const setup = ({ pathname = '', storeState = {}}) => {
  const next = jest.fn();
  const dispatch = jest.fn();
  const store = {
    dispatch,
    getState: () => storeState,
  };
  const action = { type: '@@router/LOCATION_CHANGE', payload: { pathname } };

  return { next, dispatch, store, action };
};

describe('src/authentication/authenticationMiddleware.js', () => {
  it('calls next middleware', () => {
    const { store, next, action } = setup({});

    authenticationMiddleware(store)(next)(action);

    expect(next).toHaveBeenCalled();
  });

  it('does not do anything if the route does not require login', () => {
    const { dispatch, store, next, action } = setup({
      pathname: '/home',
    });

    authenticationMiddleware(store)(next)(action);

    expect(dispatch).not.toHaveBeenCalledWith(push('/login'));
  });

  it('redirects to the login page if the route requires login and the user is not logged in', () => {
    const { dispatch, store, next, action } = setup({
      pathname: '/account/profile',
      storeState: {
        account: {},
      },
    });

    authenticationMiddleware(store)(next)(action);

    expect(dispatch).toHaveBeenCalledWith(push('/login'));
  });

  it('does not do anything if the route requires login but the user is logged in', () => {
    const { dispatch, store, next, action } = setup({
      pathname: '/account/profile',
      storeState: {
        account: { token: 'loggedInToken' },
      },
    });

    authenticationMiddleware(store)(next)(action);

    expect(dispatch).not.toHaveBeenCalledWith(push('/login'));
  });
});
