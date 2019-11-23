import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';

import AdminUserListWithData from './AdminUserListWithData';
import AddUserForm from './AddUserForm';
import ProfileWithData from '../profile/ProfileWithData';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10px',
  },
}));

const UsersPage = ({ currentUserId, profileUserId }) => {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="relative" color="default" className={styles.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Edit Existing users" icon={<PeopleIcon />} />
          <Tab label="Create New User" icon={<PersonAddIcon />} />
        </Tabs>
      </AppBar>
      {value === 0 ? (
        <>
          <AdminUserListWithData currentUserId={currentUserId} />
          {currentUserId !== profileUserId ? <ProfileWithData /> : null}
        </>
      ) : null}
      {value === 1 ? <AddUserForm /> : null}
    </>
  );
};

const mapStateToProps = state => ({
  currentUserId: state.account.id,
  profileUserId: state.profile.id,
});

export default connect(mapStateToProps)(UsersPage);
