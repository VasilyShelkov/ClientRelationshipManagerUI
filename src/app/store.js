import { combineReducers, compose, applyMiddleware } from 'redux';
import { mergePersistedState } from 'redux-localstorage';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as sweetalert } from 'react-redux-sweetalert';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import account from '../authentication/accountReducer';
import profile from '../profile/profileReducer';
import name from '../names/nameReducer';
import creatingUser from '../users/creatingUserReducer';
import selectedName from '../names/selected/selectedReducer';
import nameList from '../names/list/nameListReducer';
import app from './appReducer';

import notificationMiddleware from './notificationMiddleware';
import authenticationMiddleware from '../authentication/authenticationMiddleware';
import protectedMiddleware from '../names/list/locked/protected/protectedMiddleware';
import selectedMiddleware from '../names/selected/selectedMiddleware';

import config from '../config';

const networkInterface = createNetworkInterface({
  uri: `${config.graphQL}/graphql`,
});
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      const accountDetails = sessionStorage.getItem('account');
      const token = JSON.parse(accountDetails).account.token;
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    },
  },
]);

export const client = new ApolloClient({
  networkInterface,
  connectToDevTools: true,
  dataIdFromObject: o => o.id,
});

export const applyMiddlewares = browserHistory =>
  applyMiddleware(
    client.middleware(),
    routerMiddleware(browserHistory),
    thunk,
    authenticationMiddleware,
    protectedMiddleware,
    selectedMiddleware,
    notificationMiddleware,
  );

export default compose(
  mergePersistedState((initialState, persistedState) => ({
    ...initialState,
    ...persistedState,
    account: {
      ...initialState.account,
      ...persistedState.account,
    },
    profile: {
      ...initialState.profile,
      id: persistedState.account.id,
    },
  })),
)(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    routing: routerReducer,
    sweetalert,
    account,
    app,
    creatingUser,
    name,
    profile,
    selectedName,
    nameList,
  }),
);
