import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    width: 300,
    height: 90,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingBottom: 90,
    alignItems: 'center',
    paddingLeft: '50px',
  },
  text: {
    paddingTop: 20,
    fontFamily: "'Bebas Neue', Roboto",
    fontSize: 80,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: "'Rajdhani', sans-serif",
    width: 900,
    paddingBottom: '20px',
  },
  icon: {
    width: 300,
    height: 300,
  },
});

export default function TheTeam(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.text} gutterBottom>
        About GameGeekt
      </Typography>
      <Typography variant="h3" className={classes.textContainer} gutterBottom>
        GameGeekt is a website that provides a platform for
        gaming enthusiasts to vocalize their opinions on games
        that they have played before.
      </Typography>
      <img alt="gameImg" className={classes.icon} src="https://icons-for-free.com/iconfiles/png/512/game+controller+video+game+icon-1320087273514764593.png" />
    </div>
  );
}
