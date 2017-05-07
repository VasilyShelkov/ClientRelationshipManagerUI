import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch, Route } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';

import NameTypeListHeader from './NameTypeListHeader';
import UnprotectedNamesWithData from '../names/list/unprotected/UnprotectedNamesWithData';
import AddUnprotectedNameFormWithData from './list/unprotected/add/UnprotectedNameFormWithData';
import ProtectedNamesWithData from '../names/list/locked/protected/ProtectedNamesWithData';
import MetWithProtectedNamesWithData from '../names/list/locked/protected/MetWithProtectedNamesWithData';
import ClientsWithData from '../names/list/locked/client/ClientsWithData';
import { ProtectedIcon, MetWithProtectedIcon } from '../app/icons';
import { changeShownProtectedList } from './list/nameListActions';
import LoadingSpinner from '../shared/LoadingSpinner';

export const NameTypeList = ({
  match,
  id,
  listToShow,
  selectedNameId,
  nameActionInProgress,
  changeShownList,
  listWithSelectedName,
  currentPath
}) => (
  <div className={currentPath.split('/')[3] === listWithSelectedName && 'names__list__container'}>
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
            <Tab id="goToProtectedTab" label="PROTECTED" value="protected" icon={<ProtectedIcon />} />

            <Tab
              id="goToMetWithProtectedTab"
              label="MET WITH"
              value="metWithProtected"
              icon={<MetWithProtectedIcon />}
            />
          </Tabs>
        )}
      />

      <NameTypeListHeader match={match} id={id} />

      <Switch>
        <Route exact path={`${match.path}/unprotected`} component={UnprotectedNamesWithData} />
        <Route exact path={`${match.path}/unprotected/add`} component={AddUnprotectedNameFormWithData} />
        <Route exact path={`${match.path}/protected`} component={ProtectedNamesWithData} />
        <Route exact path={`${match.path}/metWithProtected`} component={MetWithProtectedNamesWithData} />
        <Route exact path={`${match.path}/clients`} component={ClientsWithData} />
      </Switch>
    </div>

    {nameActionInProgress &&
      <div className="names__overlay">
        <LoadingSpinner />
        {nameActionInProgress}
      </div>}
  </div>
);

const mapStateToProps = state => ({
  id: state.profile.id,
  listToShow: state.nameList.protectedListToShow,
  selectedNameId: state.selectedName.id,
  listWithSelectedName: state.selectedName.listWithSelectedName,
  nameActionInProgress: state.name.actionInProgress,
  currentPath: state.routing.location.pathname
});

const mapDispatchToProps = dispatch => ({
  changeShownList: listToShow => {
    dispatch(changeShownProtectedList(listToShow));
    dispatch(push(`/account/names/${listToShow}`));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NameTypeList);
