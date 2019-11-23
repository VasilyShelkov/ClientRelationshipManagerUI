import React from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { changeShownUserProfile } from '../profile/profileActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminUserList = ({ currentUserId, loading, users, showUserProfile }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
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
    </div>
  );
};

const mapStateToProps = state => ({
  currentUserId: state.account.id,
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
