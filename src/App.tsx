import * as React from 'react';

import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { createBrowserHistory } from 'history';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import config from './config';

import './App.css';
import store from './store';
import LoginPage from './authentication/Login';
// import AppWithNavbar from './AppWithNavbar';

const httpLink = new HttpLink({ uri: `${config.graphQL}/graphql` });
const middlewareLink = new ApolloLink((operation, forward) => {
  const accountDetails = sessionStorage.getItem('account');
  const token = accountDetails && JSON.parse(accountDetails).account.token;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null || null,
    },
  });

  return forward ? forward(operation) : null;
});
const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default () => {
  const history = createBrowserHistory();
  return (
    <ApolloProvider client={client}>
      <Provider store={store(history)}>
        <ConnectedRouter history={history} key={Math.random()}>
          <Switch>
            <Route exact={true} path="/login" component={LoginPage} />
            {/* <Route component={AppWithNavbar} /> */}
          </Switch>
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>
  );
};
