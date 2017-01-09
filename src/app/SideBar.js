import React from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import { LARGE } from 'material-ui/utils/withWidth';
import { changeSideBarState } from '../authentication/accountActions';

const SideBar = ({ open, width, handleChangeRequestSideBar }) => (
  <Drawer
    docked={width === LARGE}
    open={open || width === LARGE}
    onRequestChange={handleChangeRequestSideBar}
  >
    <h1>sideBar</h1>
  </Drawer>
);

const mapStateToProps = state => ({
  isAdmin: state.account.accountType === 'admin',
  open: state.account.sideBarOpen
});

const mapDispatchToProps = dispatch => ({
  handleChangeRequestSideBar: open => dispatch(changeSideBarState(open))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(SideBar);
