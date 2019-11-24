import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import ReduxSweetAlert from 'react-redux-sweetalert';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import NotFound from './NotFound';
import UsersPage from '../users/UsersPage';
import NavBar from './NavBar';
import ProfileWithData from '../profile/ProfileWithData';
import NameTypeList from '../names/NameTypeList';
import { closeNotification } from './appActions';

const mapStateToProps = state => ({
  showNotification: state.app.notificationMessage,
  isLoggedIn: Boolean(state.account.token),
});

const mapDispatchToProps = dispatch => ({
  closeNotificationMessage: () => dispatch(closeNotification()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ showNotification, closeNotificationMessage, isLoggedIn }) => {
  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div>
      <NavBar />

      <Switch>
        <Route path="/account/users" render={() => <UsersPage />} />
        <Route exact path="/account/profile" component={ProfileWithData} />
        <Route path="/account/names" component={NameTypeList} />
        <Route component={NotFound} />
      </Switch>

      <ReduxSweetAlert />
      <Snackbar
        id="appNotification"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showNotification}
        autoHideDuration={6000}
        onClose={closeNotificationMessage}
        message={showNotification}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={closeNotificationMessage}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
});
