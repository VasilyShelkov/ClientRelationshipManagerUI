import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.scss';

import { reducer as formReducer } from 'redux-form';

import NavBar from './NavBar';

import Home from './Home';
import Profile from './profile/Profile';
import Login from './authentication/Login';
import NotFound from './NotFound';

injectTapEventPlugin();

const client = new ApolloClient();

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

export const Root = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <ApolloProvider client={client} store={store}>
        <div className="Root">
          <Match exactly pattern="/login" component={Login} />

          <Miss component={AppWithNavbar} />
        </div>
      </ApolloProvider>
    </MuiThemeProvider>
  </BrowserRouter>
);

export const AppWithNavbar = () => (
  <div>
    <NavBar />

    <hr />

    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/profile" component={Profile} />

    <Miss component={NotFound} />
  </div>
)

if (!module.hot) render(<Root />, document.querySelector('react'));
