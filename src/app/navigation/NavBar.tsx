import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import withStyles, {
  WithStyles,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from '@material-ui/icons/DirectionsRun';
import MenuIcon from '@material-ui/icons/Menu';

import { State } from '../../rootReducer';
import { toggleSideBar, logOut } from '../../authentication/accountActions';

export const drawerWidth = 240;

const mapStateToProps = (state: State) => ({
  loggedIn: state.account.token,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  handleTouchTapLeftIconButton: () => dispatch(toggleSideBar()),
  handleLogOut: () => {
    dispatch(push('/'));
    dispatch(logOut());
  },
});

const LoginLink = (props: any) => <Link to="/login" {...props} />;

type classList =
  | 'appBar'
  | 'navIconHide'
  | 'toolbar'
  | 'drawerPaper'
  | 'content';
const styles: StyleRulesCallback<classList> = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

interface Props {
  loggedIn?: boolean;
  handleTouchTapLeftIconButton: () => any;
  handleLogOut: () => any;
}

const ResponsiveAppBar: React.SFC<Props & WithStyles<classList>> = ({
  classes,
  loggedIn,
  handleTouchTapLeftIconButton,
  handleLogOut,
}) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
      {loggedIn && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleTouchTapLeftIconButton}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Typography variant="title" color="inherit">
        Client Relationship Manager
      </Typography>
      {loggedIn ? (
        <Button onClick={handleLogOut} color="secondary">
          Logout
          <LogoutIcon />
        </Button>
      ) : (
        <Button component={LoginLink} color="inherit">
          Login
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)<{}>(ResponsiveAppBar),
);
