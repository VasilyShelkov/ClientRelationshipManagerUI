import React from 'react';

import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import store from './setupStore';
import { client } from './app/store';

export default ({ children, initialState, history }) => {
  return (
    <ThemeProvider theme={createMuiTheme({})}>
      <MuiThemeProvider>
        <ApolloProvider client={client} store={store(history, initialState)}>
          <ConnectedRouter history={history} key={Math.random()}>
            {children}
          </ConnectedRouter>
        </ApolloProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};
