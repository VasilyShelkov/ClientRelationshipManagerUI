import React from 'react';
import { connect } from 'react-redux';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import Snackbar from 'material-ui/Snackbar';

import SideBarWithData from './navigation/SideBar';
import { closeNotification } from './appActions';

const mapStateToProps = state => ({
  showNotification: state.app.notificationMessage,
  notificationColor: state.app.notificationColor
});

const mapDispatchToProps = dispatch => ({
  closeNotificationMessage: () => dispatch(closeNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withWidth()(({ children, width, showNotification, notificationColor, closeNotificationMessage }) => (
    <div>
      <SideBarWithData width={width} />

      <div style={width === LARGE ? { paddingLeft: 256 } : {}}>
        {children}
      </div>
      <Snackbar
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
