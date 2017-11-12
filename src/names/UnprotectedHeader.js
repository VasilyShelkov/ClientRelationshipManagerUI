import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add';
import { UnprotectedIcon } from '../app/icons';
import { green500 } from 'material-ui/styles/colors';

import NameListHeader from './list/NameListHeader';

export default ({ match, unprotectedCount }) => (
  <Switch>
    <Route
      path={`${match.path}/add`}
      render={() => (
        <NameListHeader
          title="Create Unprotected Name"
          Icon={UnprotectedIcon}
        />
      )}
    />
    <Route
      render={() => (
        <NameListHeader
          countId="unprotectedNamesCount"
          nameCount={unprotectedCount}
          title={
            <span>
              {` Unprotected Name${unprotectedCount === 1 ? '' : 's'}`}
              <Link to={`${match.url}/add`}>
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
  </Switch>
);
