import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AdminUserListWithData from './AdminUserListWithData';
import { changeSideBarState } from '../authentication/accountActions';
import { changeShownUserProfile } from '../profile/profileActions';
import { resetScrollPosition } from '../names/nameActions';

const UsersPage = ({
  currentUserId,
  currentPage,
  profileUserId,
  handleRouteChange,
}) => {
  const selectedValue = JSON.stringify({
    newRoute: currentPage,
    currentUserId,
    userIdToShow: profileUserId,
  });

  return (
    <AdminUserListWithData
      currentUserId={currentUserId}
      value={selectedValue}
      onChange={handleRouteChange}
    />
  );
};

const mapStateToProps = state => ({
  currentPage: state.routing.location.pathname,
  currentUserId: state.account.id,
  profileUserId: state.profile.id,
});

const mapDispatchToProps = dispatch => ({
  handleRouteChange: (event, linkValue) => {
    const { newRoute, currentUserId, userIdToShow } = JSON.parse(linkValue);
    dispatch(changeSideBarState(false));
    dispatch(push(newRoute));
    dispatch(
      changeShownUserProfile({
        currentUserId,
        userIdToShow,
        isNewUser: false,
      }),
    );
    dispatch(resetScrollPosition());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);
