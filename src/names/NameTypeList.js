import React from 'react';
import { Switch, Route } from 'react-router';

import UnprotectedNamesWithData from '../names/list/unprotected/UnprotectedNamesWithData';
import ProtectedNamesWithData from '../names/list/locked/protected/ProtectedNamesWithData';
import ClientsWithData from '../names/list/locked/client/ClientsWithData';

export default ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/unprotected`} component={UnprotectedNamesWithData} />
    <Route exact path={`${match.path}/protected`} component={ProtectedNamesWithData} />
    <Route exact path={`${match.path}/clients`} component={ClientsWithData} />
  </Switch>
);
