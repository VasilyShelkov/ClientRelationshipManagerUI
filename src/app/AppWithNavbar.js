import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import Sidebar from 'react-sidebar';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import { changeSideBarState } from '../authentication/accountActions';
import NavBarWithData from './navigation/NavBar';
import SideBarWithData from './navigation/SideBar';
import AppWithSideBar from './AppWithSideBar';
import NotFound from './NotFound';
import Home from './Home';
import UsersPage from '../users/UsersPage';

const mapStateToProps = state => ({
  open: state.account.sideBarOpen,
});

const mapDispatchToProps = dispatch => ({
  controlSidebar: open => dispatch(changeSideBarState(open)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withWidth()(({ open, width, controlSidebar }) => (
    <div>
      <NavBarWithData key="navBarContainer" />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/account/new_users"
          render={() => (
            <div className="index__content-below-navbar">
              <UsersPage />
            </div>
          )}
        />
        <Route
          render={({ location }) => (
            <Sidebar
              sidebar={<SideBarWithData />}
              docked={width === LARGE}
              open={open}
              onSetOpen={controlSidebar}
              styles={{
                overlay: {
                  zIndex: '1101',
                },
                sidebar: {
                  zIndex: '1102',
                  backgroundColor: 'white',
                },
                content: {
                  overflowY: 'auto',
                },
              }}
            >
              <div className="index__content-below-navbar">
                <Switch>
                  <Route path="/account" component={AppWithSideBar} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Sidebar>
          )}
        />
      </Switch>
    </div>
  )),
);
