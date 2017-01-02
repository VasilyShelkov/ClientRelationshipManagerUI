import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { reducer as formReducer } from 'redux-form';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import account from './authentication/accountReducer';
import profile from './profile/profileReducer';

import authenticationMiddleware from './authentication/authenticationMiddleware';

import config from '../config';

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
  connectToDevTools: true
});

const rootReducer = compose(
  mergePersistedState()
)(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    routing: routerReducer,
    account,
    profile
  })
);

const storage = compose(filter([
  'account.token',
  'account.userId',
  'account.accountType'
]))(adapter(window.sessionStorage));

export default browserHistory => createStore(
  rootReducer,
  composeWithDevTools(
    persistState(storage, 'account'),
  ),
  applyMiddleware(
    routerMiddleware(browserHistory),
    authenticationMiddleware
  )
);

