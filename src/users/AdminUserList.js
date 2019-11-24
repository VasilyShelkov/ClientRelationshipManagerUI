import React from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { changeShownUserProfile } from '../profile/profileActions';
import ProfileWithData from '../profile/ProfileWithData';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminUserList = ({
  currentUserId,
  profileUserId,
  loading,
  users,
  showUserProfile,
}) => {
  const classes = useStyles();
  const isNotLoggedInUser = currentUserId !== profileUserId;

  return (
    <div className={classes.root}>
      <Autocomplete
        defaultValue={
          isNotLoggedInUser
            ? users.find(user => user.id === profileUserId)
            : undefined
        }
        style={{ width: '100%' }}
        getOptionLabel={user => `${user.firstName} ${user.lastName}`}
        options={users}
        loading={loading}
        clearOnEscape={true}
        loadingText={'Loading existing users...'}
        onChange={(event, user) => {
          showUserProfile(currentUserId, user ? user.id : currentUserId);
        }}
        renderInput={params => (
          <TextField
            {...params}
            label={`Search user...`}
            fullWidth
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {isNotLoggedInUser ? <ProfileWithData /> : null}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUserId: state.account.id,
  profileUserId: state.profile.id,
});

const mapDispatchToProps = dispatch => ({
  showUserProfile: (currentUserId, userIdToShow) =>
    dispatch(
      changeShownUserProfile({
        currentUserId,
        userIdToShow,
        isNewUser: false,
      }),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminUserList);
