import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import ReduxSweetAlert from 'react-redux-sweetalert';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import Snackbar from 'material-ui/Snackbar';

import SideBarWithData from './navigation/SideBar';
import ProfileWithData from '../profile/ProfileWithData';
import AddUserFormWithData from '../users/AddUserForm';
import NameTypeList from '../names/NameTypeList';
import { closeNotification } from './appActions';

const mapStateToProps = state => ({
  showNotification: state.app.notificationMessage,
  notificationColor: state.app.notificationColor
});

const mapDispatchToProps = dispatch => ({
  closeNotificationMessage: () => dispatch(closeNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withWidth()(({ match, width, showNotification, notificationColor, closeNotificationMessage }) => (
    <div>
      <SideBarWithData width={width} />

      <div style={width === LARGE ? { paddingLeft: 256 } : {}}>
        <Switch>
          <Route exact path={`${match.path}/(users)?/:userName?/profile`} component={ProfileWithData} />
          <Route exact path={`${match.path}/users/add`} component={AddUserFormWithData} />
          <Route path={`${match.path}/names`} component={NameTypeList} />
        </Switch>
      </div>

      <ReduxSweetAlert />
      <Snackbar
        id="appNotification"
        open={showNotification}
        message={showNotification}
        autoHideDuration={5000}
        onRequestClose={closeNotificationMessage}
        contentStyle={{
          color: notificationColor,
          display: 'flex',
          justifyContent: 'center'
        }}
      />
    </div>
  ))
);
