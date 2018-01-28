import { createStore, compose, applyMiddleware } from 'redux';
import * as adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import persistState from 'redux-localstorage';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import authenticationMiddleware from './authentication/authenticationMiddleware';
// import protectedMiddleware from '../names/list/locked/protected/protectedMiddleware';
// import selectedMiddleware from '../names/selected/selectedMiddleware';
// import notificationMiddleware from './notificationMiddleware';

import rootReducer from './rootReducer';

const storage = compose(
  filter(['account.token', 'account.id', 'account.accountType']),
)(adapter(window.sessionStorage));

export default (browserHistory: any) =>
  createStore(
    rootReducer,
    composeWithDevTools(
      persistState(storage, 'account'),
      applyMiddleware(
        routerMiddleware(browserHistory),
        thunk,
        authenticationMiddleware as any,
        // protectedMiddleware,
        // selectedMiddleware,
        // notificationMiddleware,
      ),
    ),
  );
