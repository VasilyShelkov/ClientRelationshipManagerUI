import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './root.scss';
import store, { client } from './store';
import routes from './routes';

injectTapEventPlugin();

const rootStore = store(browserHistory);
const history = syncHistoryWithStore(browserHistory, rootStore);

const Root = () => (
  <MuiThemeProvider>
    <ApolloProvider client={client} store={rootStore}>
      <Router history={history} routes={routes} />
    </ApolloProvider>
  </MuiThemeProvider>
);

export default Root;

if (!module.hot) render(<Root />, document.querySelector('react'));
