import React from 'react';

import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './setupStore';
import { client } from './app/store';

export default ({ children, initialState, history }) => {
  return (
    <MuiThemeProvider>
      <ApolloProvider client={client} store={store(history, initialState)}>
        <ConnectedRouter history={history} key={Math.random()}>
          {children}
        </ConnectedRouter>
      </ApolloProvider>
    </MuiThemeProvider>
  );
};
