import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { reducer as formReducer } from 'redux-form';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import account from '../authentication/accountReducer';
import profile from '../profile/profileReducer';
import name from '../names/nameReducer';
import creatingUser from '../users/creatingUserReducer';
import app from './appReducer';

import authenticationMiddleware from '../authentication/authenticationMiddleware';

import config from '../../config';

const networkInterface = createNetworkInterface({ uri: `${config.graphQL}/graphql` });
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    const accountDetails = sessionStorage.getItem('account');
    const token = JSON.parse(accountDetails).account.token;
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

export const client = new ApolloClient({
  networkInterface,
  connectToDevTools: true,
  dataIdFromObject: o => o.id
});

const rootReducer = compose(
  mergePersistedState((initialState, persistedState) => ({
    ...initialState,
    ...persistedState,
    account: {
      ...initialState.account,
      ...persistedState.account
    },
    profile: {
      ...initialState.profile,
      id: persistedState.account.id
    }
  }))
)(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    routing: routerReducer,
    account,
    app,
    creatingUser,
    name,
    profile
  })
);

const storage = compose(filter([
  'account.token',
  'account.id',
  'account.accountType'
]))(adapter(window.sessionStorage));

export default browserHistory => createStore(
  rootReducer,
  composeWithDevTools(
    persistState(storage, 'account'),
    applyMiddleware(
      client.middleware(),
      routerMiddleware(browserHistory),
      authenticationMiddleware,
    )
  )
);

