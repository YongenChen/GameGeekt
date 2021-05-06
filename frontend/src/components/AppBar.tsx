import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Grid,
  InputAdornment,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  fade,
} from '@material-ui/core/styles';
import {
  Menu as MenuIcon, Search as SearchIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Drawer from './Drawer';
import AuthAction from './AuthAction';

const useStyles = makeStyles((theme: Theme) => createStyles({
  // appBar: {
  // backgroundColor: theme.palette.type === 'light' ?
  // 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
  // backdropFilter: 'blur(3px)',
  // boxShadow: `1px 1px 1px 0 ${theme.palette.type === 'light' ?
  // 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'}`,
  // },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    background: 'linear-gradient(#e01e37, #b7094c, #3bc2db, #ffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitTextStrokeWidth: '0.8px',
    WebkitTextStrokeColor: 'white',
    //  color: theme.palette.type === 'light' ?
    //  theme.palette.secondary.main : theme.palette.secondary.light,
    textDecoration: 'none',
    fontFamily: "'Press Start 2P', Roboto",
    fontSize: '35px',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconLogoContainer: {
    display: 'flex',
  },
  fillGap: {
    flexGrow: 1,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#ffff',
  },
  inputInput: {
    color: '#ffff',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    transition: '.35s ease-in-out',
    width: '100%',
    paddingLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginButton: {
    borderColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.main,
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.tertiary.light,
    },
    marginRight: theme.spacing(2),
  },
  signUpButton: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      backgroundColor: theme.palette.tertiary.light,
    },
  },
}));

interface Props {
  getGlobalTheme: () => void;
}

export default function AppBar({ getGlobalTheme }: Props): ReactElement {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <MUIAppBar
      position="static"
    >
      <Drawer open={drawerOpen} anchor="left" getGlobalTheme={getGlobalTheme} onClose={closeDrawer} />
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={3}>
          <Grid item xs className={classes.iconLogoContainer}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawer}
            >
              <MenuIcon />
            </IconButton>
            <div>
              <Typography
                className={classes.title}
                variant="h6"
                noWrap
                component={Link}
                to="/"
              >
                GameGeekt
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.searchContainer}>
            <InputBase
              startAdornment={<InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>}
              className={classes.inputInput}
              placeholder="Search for a game..."
            />
          </Grid>
          <Grid item xs className={classes.actionContainer}>
            <AuthAction />
          </Grid>
        </Grid>

        {/* <div className={classes.fillGap} /> */}
      </Toolbar>
    </MUIAppBar>
  );
}
