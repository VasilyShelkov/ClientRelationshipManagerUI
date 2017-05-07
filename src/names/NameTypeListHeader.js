import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';
import { green500 } from 'material-ui/styles/colors';

import GetUserNamesCount from './GetUserNamesCount.gql';
import { UnprotectedIcon, ProtectedIcon, MetWithProtectedIcon, ClientsIcon } from '../app/icons';
import NameListHeader from './list/NameListHeader';

export const NameTypeListHeader = ({ match, loading, user }) => {
  if (loading) return null;
  const { protectedNamesLimit, latestProgress } = user;
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${match.path}/unprotected`}
          render={() => (
            <NameListHeader
              countId="unprotectedNamesCount"
              nameCount={latestProgress.unprotectedCount}
              title={
                <span>
                  {` Unprotected Name${latestProgress.unprotectedCount === 1 ? '' : 's'}`}
                  <Link to={`${match.url}/unprotected/add`}>
                    <IconButton id="createUnprotectedName">
                      <Avatar icon={<AddIcon />} backgroundColor={green500} />
                    </IconButton>
                  </Link>
                </span>
              }
              Icon={UnprotectedIcon}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/unprotected/add`}
          render={() => <NameListHeader title="Create Unprotected Name" Icon={UnprotectedIcon} />}
        />
        <Route
          exact
          path={`${match.path}/protected`}
          render={() => (
            <NameListHeader
              countId="protectedNamesCount"
              nameCount={latestProgress.protectedCount}
              title={`/${protectedNamesLimit} Protected Name${latestProgress.protectedCount === 1 ? '' : 's'}`}
              Icon={ProtectedIcon}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/metWithProtected`}
          render={() => (
            <NameListHeader
              countId="metWithProtectedNamesCount"
              nameCount={latestProgress.metWithProtectedCount}
              title={` Met With Protected Name${latestProgress.metWithProtectedCount === 1 ? '' : 's'}`}
              Icon={MetWithProtectedIcon}
            />
          )}
        />
        <Route
          exact
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
    </div>
  );
};

export default graphql(GetUserNamesCount, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    user,
    ...ownProps
  })
})(NameTypeListHeader);
