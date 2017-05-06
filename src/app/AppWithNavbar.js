import React from 'react';
import { Switch, Route } from 'react-router';

import NavBarWithData from './navigation/NavBar';
import AppWithSideBar from './AppWithSideBar';
import NotFound from './NotFound';
import Home from './Home';

export default () => (
  <div>
    <NavBarWithData key="navBarContainer" />

    <div className="index__content-below-navbar">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={AppWithSideBar} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);
