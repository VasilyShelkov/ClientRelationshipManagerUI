import React from 'react';

import { createBrowserHistory } from 'history';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginPage from '../authentication/Login';
import AppWithNavbar from './AppWithNavbar';
import './root.scss';

export default ({ store, client }) => {
  const history = createBrowserHistory();
  return (
    <MuiThemeProvider>
      <ApolloProvider client={client} store={store(history)}>
        <ConnectedRouter history={history} key={Math.random()}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route component={AppWithNavbar} />
          </Switch>
        </ConnectedRouter>
      </ApolloProvider>
    </MuiThemeProvider>
  );
};
