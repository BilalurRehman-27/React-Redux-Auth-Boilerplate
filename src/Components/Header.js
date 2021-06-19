import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { actions } from '../redux/user';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function Header({ isLoggedIn }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loggedInUser = useSelector((state) => {
    return state.user.profileName;
  });

  const loginStatus = () => {
    return isLoggedIn ? (
      <PopupState variant='popover' popupId='demo-popup-popover'>
        {(popupState) => (
          <div>
            <Button
              variant='contained'
              color='primary'
              {...bindTrigger(popupState)}
            >
              {loggedInUser}
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Button
                component={RouterLink}
                to='/'
                onClick={() => dispatch(actions.logOut())}
                color='primary'
                variant='outlined'
                className={classes.link}
              >
                Logout
              </Button>
            </Popover>
          </div>
        )}
      </PopupState>
    ) : (
      <Button
        component={RouterLink}
        to='/'
        color='primary'
        variant='outlined'
        className={classes.link}
      >
        Login
      </Button>
    );
  };

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.toolbarTitle}
        >
          <Link component={RouterLink} to='/'>
            NISA SULTAN
          </Link>
        </Typography>
        <nav>
          <Button
            to='/ViewOrders'
            component={RouterLink}
            color='primary'
            variant='outlined'
            className={classes.link}
          >
            View Orders
          </Button>

          {/* <Link
            component={RouterLink}
            to='/Home'
            variant='button'
            color='textPrimary'
            href='#'
            className={classes.link}
          >
            Home
          </Link> */}
        </nav>
        {loginStatus()}
      </Toolbar>
    </AppBar>
  );
}
