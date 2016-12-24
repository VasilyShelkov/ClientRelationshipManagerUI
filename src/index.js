import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import Redirect from 'react-router/Redirect';

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

const rootStore = store();
const authenticated = rootStore.getState().account.token;

export const Root = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <ApolloProvider client={client} store={rootStore}>
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
    <NavBar loggedIn={authenticated} />

    <div className="index__content-below-navbar">
      <Match exactly pattern="/" component={Home} />
      <Miss component={AuthenticatedRoutes} />
    </div>
  </div>
);

const AuthenticatedRoutes = () => {
  debugger;
  if (authenticated) {
    return (
      <div>
        <Match exactly pattern="/profile" component={Profile} />
        <Miss component={NotFound} />
      </div>
    );
  }

  return <Redirect to="/login" push />;
};

if (!module.hot) render(<Root />, document.querySelector('react'));
