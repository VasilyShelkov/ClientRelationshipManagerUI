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

import Home from './Home';

import AppWithNavbar from './AppWithNavbar';
import NotFound from './NotFound';

import AppWithSideBar from './AppWithSideBar';
import Profile from '../profile/Profile';

import AddUser from '../users/AddUser';
import UsersPerformance from '../users/UsersPerformance';

import UnprotectedNames from '../names/UnprotectedNames';
import ProtectedNames from '../names/ProtectedNames';
import ClientNames from '../names/ClientNames';

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

            <Route path="performance" component={UsersPerformance} />
            <Route path="users/add" component={AddUser} />

            <Route path="names">
              <Route path="unprotected" component={UnprotectedNames} />
              <Route path="protected" component={ProtectedNames} />
              <Route path="clients" component={ClientNames} />
            </Route>
          </Route>

          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>
);


if (!module.hot) render(<Root />, document.querySelector('react'));
