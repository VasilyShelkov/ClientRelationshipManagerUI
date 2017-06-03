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

const mapStateToProps = state => ({
  open: state.account.sideBarOpen
});

const mapDispatchToProps = dispatch => ({
  controlSidebar: open => dispatch(changeSideBarState(open))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withWidth()(({ open, width, controlSidebar }) => (
    <Sidebar
      sidebar={<SideBarWithData />}
      docked={width === LARGE}
      open={open}
      onSetOpen={controlSidebar}
      styles={{
        overlay: {
          zIndex: '1101'
        },
        sidebar: {
          zIndex: '1102',
          backgroundColor: 'white'
        },
        content: {
          overflowY: 'auto'
        }
      }}
    >
      <NavBarWithData key="navBarContainer" />

      <div className="index__content-below-navbar">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/account" component={AppWithSideBar} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Sidebar>
  ))
);
