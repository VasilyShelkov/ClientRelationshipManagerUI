import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Hot } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, compose, applyMiddleware } from 'redux';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import persistState from 'redux-localstorage';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import authenticationMiddleware from '../authentication/authenticationMiddleware';
import protectedMiddleware from '../names/list/locked/protected/protectedMiddleware';
import selectedMiddleware from '../names/selected/selectedMiddleware';
import notificationMiddleware from './notificationMiddleware';

import rootReducer, { client } from './store';

import Root from './Root';

injectTapEventPlugin();

const storage = compose(filter(['account.token', 'account.id', 'account.accountType']))(adapter(window.sessionStorage));

const store = browserHistory =>
  createStore(
    rootReducer,
    composeWithDevTools(
      persistState(storage, 'account'),
      applyMiddleware(
        client.middleware(),
        routerMiddleware(browserHistory),
        thunk,
        authenticationMiddleware,
        protectedMiddleware,
        selectedMiddleware,
        notificationMiddleware
      )
    )
  );

const render = Component => {
  ReactDOM.render(
    <Hot>
      <Component store={store} client={client} />
    </Hot>,
    document.querySelector('react')
  );
};

render(Root);

if (module.hot) {
  module.hot.dispose(() => {
    // Force Apollo to fetch the latest data from the server
    delete window.__APOLLO_STATE__;
  });

  module.hot.accept('./Root', () => {
    render(Root);
  });

  module.hot.accept('./store', () => {
    const reducers = require('./store').default;
    return store.replaceReducer(reducers);
  });
}
