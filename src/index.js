import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './index.scss';

import NavBar from './NavBar';

import Home from './Home';
import Profile from './profile/Profile';
import Login from './Login';
import NotFound from './NotFound';

injectTapEventPlugin();

const client = new ApolloClient();

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
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
        <div>
          <NavBar />

          <hr />

          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/profile" component={Profile} />
          <Match exactly pattern="/login" component={Login} />

          <Miss component={NotFound} />
        </div>
      </ApolloProvider>
    </MuiThemeProvider>
  </BrowserRouter>
);

if (!module.hot) render(<Root />, document.querySelector('react'));
