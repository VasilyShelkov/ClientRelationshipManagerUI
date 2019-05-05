import React from 'react';
import ReactDOM from 'react-dom';
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

const storage = compose(
  filter(['account.token', 'account.id', 'account.accountType']),
)(adapter(window.sessionStorage));

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
        notificationMiddleware,
      ),
    ),
  );

ReactDOM.render(
  <Root store={store} client={client} />,
  document.getElementById('root')
);
