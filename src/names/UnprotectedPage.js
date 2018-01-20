import React from 'react';
import { Switch, Route } from 'react-router';
import UnprotectedNamesWithData from '../names/list/unprotected/UnprotectedNamesWithData';
import AddUnprotectedNameFormWithData from './list/unprotected/add/UnprotectedNameFormWithData';

export default ({ match }) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.path}/add`}
        component={AddUnprotectedNameFormWithData}
      />
      <Route component={UnprotectedNamesWithData} />
    </Switch>
  );
};
