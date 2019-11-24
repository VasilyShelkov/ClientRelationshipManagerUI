import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch, Route, matchPath } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';

import NameTypeListHeader from './NameTypeListHeader';
import UnprotectedPage from './UnprotectedPage';
import ProtectedNamesWithData from '../names/list/locked/protected/ProtectedNamesWithData';
import MetWithProtectedNamesWithData from '../names/list/locked/protected/MetWithProtectedNamesWithData';
import ClientsWithData from '../names/list/locked/client/ClientsWithData';
import SelectedName from './selected/SelectedNameWithData';
import { ProtectedIcon, MetWithProtectedIcon } from '../app/icons';
import { changeShownProtectedList } from './list/nameListActions';
import LoadingSpinner from '../shared/LoadingSpinner';

export const NameTypeList = ({
  match,
  id,
  listToShow,
  nameActionInProgress,
  changeShownList,
  listWithSelectedName,
  currentPath,
}) => (
  <div
    className={
      _.get(
        matchPath(currentPath, { path: '/account/names/:nameType/selected' }),
        'params.nameType',
      ) === listWithSelectedName && 'names__list__container'
    }
  >
    <div className={nameActionInProgress && 'names__content'}>
      <Route
        path={`${match.path}/(protected|metWithProtected)`}
        render={() => (
          <Tabs
            className={false && 'protected__container__names'}
            style={{ marginTop: '20px' }}
            value={listToShow}
            onChange={changeShownList}
          >
            <Tab
              id="goToProtectedTab"
              label="PROTECTED"
              value="protected"
              icon={<ProtectedIcon />}
            />

            <Tab
              id="goToMetWithProtectedTab"
              label="MET WITH"
              value="metWithProtected"
              icon={<MetWithProtectedIcon />}
            />
          </Tabs>
        )}
      />

      {id ? <NameTypeListHeader match={match} id={id} /> : null}

      <Switch>
        <Route path={`${match.path}/unprotected`} component={UnprotectedPage} />
        <Route
          path={`${match.path}/protected`}
          component={ProtectedNamesWithData}
        />
        <Route
          path={`${match.path}/metWithProtected`}
          component={MetWithProtectedNamesWithData}
        />
        <Route path={`${match.path}/clients`} component={ClientsWithData} />
      </Switch>

      <Route
        path={`${match.path}/:nameListType/selected`}
        component={SelectedName}
      />
    </div>

    {nameActionInProgress && (
      <div className="names__overlay">
        <LoadingSpinner />
        {nameActionInProgress}
      </div>
    )}
  </div>
);

const mapStateToProps = state => ({
  id: state.profile.id,
  listToShow: state.nameList.protectedListToShow,
  listWithSelectedName: state.selectedName.listWithSelectedName,
  nameActionInProgress: state.name.actionInProgress,
  currentPath: state.routing.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  changeShownList: listToShow => {
    dispatch(changeShownProtectedList(listToShow));
    dispatch(push(`/account/names/${listToShow}`));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameTypeList);
