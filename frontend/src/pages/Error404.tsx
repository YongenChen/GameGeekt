import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import Game from 'react-dinosaur-game';

const useStyles = makeStyles({
  button: {
    width: 300,
    height: 90,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    paddingBottom: 90,
    alignItems: 'center',
  },
  text: {
    color: '#ed1000',
    paddingBottom: 20,
    fontStyle: 'italic',
    fontFamily: "'Bebas Neue', Roboto",
    fontSize: 80,
  },
});

export default function Error(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src="https://c.tenor.com/eDchk3srtycAAAAj/piffle-error.gif" alt="loading" />
      <Typography variant="h2" className={classes.text}>
        ERROR 404: Sorry page does not exist
        (✖╭╮✖)
      </Typography>
      <Button
        component={Link}
        to="/"
        type="button"
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        <Typography variant="h5">
          Go home
        </Typography>
      </Button>
    </div>
  );
}
