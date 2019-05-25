import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Switch, Route } from 'react-router';

import ApplicationProviders from './ApplicationProviders';
import LoginPage from './authentication/Login';
import AppWithNavbar from './app/AppWithNavbar';
import './index.scss';

const Root = () => {
  const history = createBrowserHistory();
  return (
    <ApplicationProviders history={history}>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route component={AppWithNavbar} />
      </Switch>
    </ApplicationProviders>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
