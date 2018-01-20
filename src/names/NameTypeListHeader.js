import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

import GetUserNamesCount from './GetUserNamesCount.gql';
import { ProtectedIcon, MetWithProtectedIcon, ClientsIcon } from '../app/icons';
import UnprotectedHeader from './UnprotectedHeader';
import NameListHeader from './list/NameListHeader';

export const NameTypeListHeader = ({ match, loading, user, listToShow }) => {
  if (loading) return null;
  const { protectedNamesLimit, latestProgress } = user;
  return (
    <Switch>
      <Route
        path={`${match.path}/unprotected`}
        render={({ match }) => (
          <UnprotectedHeader
            match={match}
            unprotectedCount={latestProgress.unprotectedCount}
          />
        )}
      />
      <Route
        path={`${match.path}/protected`}
        render={() => (
          <NameListHeader
            countId="protectedNamesCount"
            nameCount={latestProgress.protectedCount}
            title={`/${protectedNamesLimit} Protected Name${
              latestProgress.protectedCount === 1 ? '' : 's'
            }`}
            Icon={ProtectedIcon}
          />
        )}
      />
      <Route
        path={`${match.path}/metWithProtected`}
        render={() => (
          <NameListHeader
            countId="metWithProtectedNamesCount"
            nameCount={latestProgress.metWithProtectedCount}
            title={` Met With Protected Name${
              latestProgress.metWithProtectedCount === 1 ? '' : 's'
            }`}
            Icon={MetWithProtectedIcon}
          />
        )}
      />
      <Route
        path={`${match.path}/clients`}
        render={() => (
          <NameListHeader
            countId="clientsCount"
            nameCount={latestProgress.clientCount}
            title={` Client${latestProgress.clientCount === 1 ? '' : 's'}`}
            Icon={ClientsIcon}
          />
        )}
      />
    </Switch>
  );
};

export default graphql(GetUserNamesCount, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    user,
    ...ownProps,
  }),
})(NameTypeListHeader);
