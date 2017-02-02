import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LoginPage from '../authentication/Login';

import AppWithNavbar from './AppWithNavbar';
import Home from './Home';
import NotFound from './NotFound';

import AppWithSideBar from './AppWithSideBar';
import ProfileWithData from '../profile/ProfileWithData';
import AddUserFormWithData from '../users/AddUserForm';
import UsersPerformance from '../users/UsersPerformance';
import UnprotectedNames from '../names/UnprotectedNames';
import ProtectedNames from '../names/ProtectedNames';
import ClientNames from '../names/ClientNames';

export default [
  <Route path="/login" component={LoginPage} />,
  <Route path="/" component={AppWithNavbar}>
    <IndexRoute component={Home} />
    <Route path="account" component={AppWithSideBar}>
      <Route path="profile" component={ProfileWithData} />
      <Route path="performance" component={UsersPerformance} />
      <Route path="users">
        <Route path="add" component={AddUserFormWithData} />
        <Route path=":userName/profile" component={ProfileWithData} />
      </Route>
      <Route path="names">
        <Route path="unprotected" component={UnprotectedNames} />
        <Route path="protected" component={ProtectedNames} />
        <Route path="clients" component={ClientNames} />
      </Route>
    </Route>
  </Route>,
  <Route path="*" component={NotFound} />
];
