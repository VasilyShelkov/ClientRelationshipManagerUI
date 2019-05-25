import { createStore, compose } from 'redux';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import persistState from 'redux-localstorage';

import rootReducer, { applyMiddlewares } from './app/store';

const storage = compose(
  filter(['account.token', 'account.id', 'account.accountType']),
)(adapter(window.sessionStorage));

const store = (browserHistory, initialState) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      persistState(storage, 'account'),
      applyMiddlewares(browserHistory),
    ),
  );

export default store;
