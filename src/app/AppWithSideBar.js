import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import ReduxSweetAlert from 'react-redux-sweetalert';
import Snackbar from 'material-ui/Snackbar';

import NameTypeList from '../names/NameTypeList';
import { closeNotification } from './appActions';
import ProfileWithData from '../profile/ProfileWithData';

const mapStateToProps = state => ({
  showNotification: state.app.notificationMessage,
  notificationColor: state.app.notificationColor,
});

const mapDispatchToProps = dispatch => ({
  closeNotificationMessage: () => dispatch(closeNotification()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  ({
    match,
    showNotification,
    notificationColor,
    closeNotificationMessage,
  }) => (
    <div>
      <Switch>
        <Route
          exact
          path={`${match.path}/profile`}
          component={ProfileWithData}
        />
        <Route path={`${match.path}/names`} component={NameTypeList} />
      </Switch>

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
          justifyContent: 'center',
        }}
      />
    </div>
  ),
);
