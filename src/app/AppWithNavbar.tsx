import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Switch, Route } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { State } from '../rootReducer';
import SideBarWithData from './navigation/SideBar';
import { toggleSideBar } from '../authentication/accountActions';
import NavBarWithData from './navigation/NavBar';
// import AppWithSideBar from './AppWithSideBar';
// import NotFound from './NotFound';
import Home from './Home';

const mapStateToProps = (state: State) => ({
  open: state.account.sideBarOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  toggleSidebar: () => dispatch(toggleSideBar()),
});

interface Props {
  open: boolean;
  toggleSidebar: () => any;
}

const AppWitNavbar: React.SFC<Props> = ({ open, toggleSidebar }) => (
  <div>
    <NavBarWithData />

    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route
        render={() => (
          <>
            <Hidden mdUp={true}>
              <Drawer
                variant="temporary"
                open={open}
                anchor="left"
                onClose={toggleSidebar}
                ModalProps={{ keepMounted: true }}
              >
                <SideBarWithData />
              </Drawer>
            </Hidden>

            <Hidden smDown={true}>
              <Drawer variant="permanent" open={open} anchor="left">
                <SideBarWithData />
              </Drawer>
            </Hidden>

            {/* <Switch>
              <Route path="/account" component={AppWithSideBar} />
              <Route component={NotFound} />
            </Switch> */}
          </>
        )}
      />
    </Switch>
  </div>
);
export default connect(mapStateToProps, mapDispatchToProps)(AppWitNavbar);
