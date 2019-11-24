import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';

import AdminUserListWithData from './AdminUserListWithData';
import AddUserForm from './AddUserForm';
import NavBar from '../app/NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10px',
  },
}));

const UsersPage = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NavBar />
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
      {value === 0 ? <AdminUserListWithData /> : null}
      {value === 1 ? (
        <AddUserForm
          onAddUserSuccess={() => {
            setValue(0);
          }}
        />
      ) : null}
    </>
  );
};

export default UsersPage;
