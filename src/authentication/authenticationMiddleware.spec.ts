// import { push } from 'react-router-redux';
// import authenticationMiddleware from './authenticationMiddleware';
// import { REACT_ROUTER_LOCATION_CHANGE } from '../thirdPartyActions'

// const setup = ({ pathname = '', storeState = {}, sandbox }) => {
//   const next = sandbox.spy();
//   const dispatch = sandbox.spy();
//   const store = {
//     dispatch,
//     getState: () => storeState,
//   };
//   const action = { type: '@@router/LOCATION_CHANGE', payload: { pathname } };

//   return { next, dispatch, store, action };
// };

describe('src/authentication/authenticationMiddleware.js', () => {
  it('calls next middleware', () => {
    // const store = {
    //   dispatch: jest.fn(),
    //   subscribe: {},
    //   replaceReducer: {},
    //   getState: () => ({
    //     form: {},
    //     routing: {},
    //     sweetalert: {},
    //     account: {
    //       loggingIn: false,
    //       sideBarOpen: false,
    //       returnUrl: '',
    //     },
    //   }),
    // };
    // const next = jest.fn();
    // const action = { type: REACT_ROUTER_LOCATION_CHANGE, payload: { pathname: '' } }
    // authenticationMiddleware(store)(next)(action);
    // expect(next).toHaveBeenCalled()
  });

  //   it(
  //     'does not do anything if the route does not require login',
  //     sinon.test(function() {
  //       const { dispatch, store, next, action } = setup({
  //         pathname: '/home',
  //         sandbox: this,
  //       });

  //       authenticationMiddleware(store)(next)(action);

  //       expect(dispatch).not.to.have.been.calledWith(push('/login'));
  //     }),
  //   );

  //   it(
  //     'redirects to the login page if the route requires login and the user is not logged in',
  //     sinon.test(function() {
  //       const { dispatch, store, next, action } = setup({
  //         pathname: '/account/profile',
  //         storeState: {
  //           account: {},
  //         },
  //         sandbox: this,
  //       });

  //       authenticationMiddleware(store)(next)(action);

  //       expect(dispatch).to.have.been.calledWith(push('/login'));
  //     }),
  //   );

  //   it(
  //     'does not do anything if the route requires login but the user is logged in',
  //     sinon.test(function() {
  //       const { dispatch, store, next, action } = setup({
  //         pathname: '/account/profile',
  //         storeState: {
  //           account: { token: 'loggedInToken' },
  //         },
  //         sandbox: this,
  //       });

  //       authenticationMiddleware(store)(next)(action);

  //       expect(dispatch).not.to.have.been.calledWith(push('/login'));
  //     }),
  //   );
});
