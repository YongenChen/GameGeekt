import {
  FormControlLabel,
  List,
  ListItem,
  ListItemText, Switch, Typography, Drawer as MUIDrawer, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
open: boolean;
onClose: () => void;
anchor: 'left' | 'right' | 'top' | 'bottom';
getGlobalTheme: () => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  drawer: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    color: 'white',
  },
  computerIcon: {
    color: 'white',
  },
  listTitleContainer: {
    paddingTop: '15px',
    textAlign: 'center',
  },
  listTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontFamily: "'Bebas Neue', Roboto",
  },
  lastItem: {
    borderTop: '1px solid #FFFF',
    borderBottom: '1px solid #FFFF',
  },
  listItemBorder: {
    borderTop: '4px solid #FFFF',
  },
  listItemText: {
    fontFamily: "'Play', Roboto",
    textAlign: 'center',
  },
}));

function Drawer({
  open, anchor, onClose, getGlobalTheme,
}: Props): ReactElement {
  const classes = useStyles();
  const [darkModeOn, setDarkMode] = useState(localStorage.getItem('darkThemeState') === 'dark');
  const toggleDarkMode = () => {
    localStorage.setItem('darkThemeState', !darkModeOn ? 'dark' : 'light');
    setDarkMode(!darkModeOn);
    getGlobalTheme();
  };

  return (
    <MUIDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
    >
      <div className={classes.drawer}>
        <div className={classes.listTitleContainer}>
          <Typography
            variant="h5"
            className={classes.listTitle}
          >
            <b>Games</b>
          </Typography>
        </div>
        <List>
          <ListItem
            button
            component={Link}
            to="/first-person-shooter"
            onClick={onClose}
            className={classes.listItemBorder}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                First Person Shooter
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/multiplayer-online-battle-arena"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Multiplayer Online Battle Arena
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/massively-multiplayer-online"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Massively Multiplayer Online
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/simulation"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Simulation
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/adventure"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Adventure
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/real-time-strategy"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Real-Time Strategy
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/puzzle"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Puzzle
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/sports"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Sports
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/role-playing"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Role-Playing
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/mobile-games"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Mobile Games
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/request-game-form"
            onClick={onClose}
          >
            <ListItemText className={classes.listItemText}>
              <Typography
                variant="h6"
                className={classes.listItemText}
              >
                Request a game
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={(
                <Switch
                  name="darkThemeToggle"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={darkModeOn}
                  onChange={toggleDarkMode}
                />
              )}
              label="Dark Mode"
            />
          </ListItem>
        </List>
      </div>
    </MUIDrawer>
  );
}

export default Drawer;
