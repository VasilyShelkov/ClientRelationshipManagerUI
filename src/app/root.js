import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import { render } from 'react-dom';
import {
  browserHistory, Router, Route, IndexRoute
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { ApolloProvider } from 'react-apollo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './root.scss';

import store, { client } from './store';

import LoginPage from '../authentication/Login';

import NavBar from './NavBar';
import AppWithSideBar from './AppWithSideBar';
import Home from './Home';
import Profile from '../profile/Profile';
import NotFound from './NotFound';

injectTapEventPlugin();

const rootStore = store(browserHistory);
const history = syncHistoryWithStore(browserHistory, rootStore);

export const Root = () => (
  <MuiThemeProvider>
    <ApolloProvider client={client} store={rootStore}>
      <Router history={history}>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={AppWithNavbar}>
          <IndexRoute component={Home} />

          <Route path="account" component={AppWithSideBar}>
            <Route path="profile" component={Profile} />
          </Route>

          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>
);

export const AppWithNavbar = ({ children }) => (
  <div>
    <NavBar />

    <div className="index__content-below-navbar">
      {children}
    </div>
  </div>
);

if (!module.hot) render(<Root />, document.querySelector('react'));
