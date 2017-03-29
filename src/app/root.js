import React, { Component } from 'react';

import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './root.scss';
import routes from './routes';

class Root extends Component {
  render() {
    const { store, client } = this.props;
    const rootStore = store(browserHistory);
    const history = syncHistoryWithStore(browserHistory, rootStore);
    return (
      <MuiThemeProvider>
        <ApolloProvider client={client} store={rootStore}>
          <Router key={Math.random()} history={history}>
            { routes }
          </Router>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default Root;
