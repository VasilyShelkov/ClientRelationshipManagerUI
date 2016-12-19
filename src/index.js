import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import { ApolloProvider } from 'react-apollo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.scss';

import store, { client } from './store';

import Login from './authentication/Login';

import NavBar from './NavBar';
import Home from './Home';
import Profile from './profile/Profile';
import NotFound from './NotFound';

injectTapEventPlugin();

export const Root = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <ApolloProvider client={client} store={store()}>
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

    <div className="index__content-below-navbar">
      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/profile" component={Profile} />

      <Miss component={NotFound} />
    </div>
  </div>
);

if (!module.hot) render(<Root />, document.querySelector('react'));
