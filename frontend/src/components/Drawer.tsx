import {
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Switch, Typography, Drawer as MUIDrawer, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { Computer as ComputerIcon } from '@material-ui/icons';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
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
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                First Person Shooter
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/multiplayer-online-battle-arena"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Multiplayer Online Battle Arena
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/massively-multiplayer-online"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Massively Multiplayer Online
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/simulation"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Simulation
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/adventure"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Adventure
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/real-time-strategy"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Real-Time Strategy
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/puzzle"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Puzzle
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/sports"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Sports
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/role-playing"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Role-Playing
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/mobile-games"
          >
            <ListItemIcon>
              <ComputerIcon className={classes.computerIcon} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
              >
                Mobile Games
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Request-Game-Form"
          >
            <ListItemIcon>
              <AddToQueueIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
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
