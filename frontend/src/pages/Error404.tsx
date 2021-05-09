import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import Game from 'react-dinosaur-game';

const useStyles = makeStyles({
  button: {
    width: 200,
    height: 60,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '90vh',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontWeight: 200,
    fontStyle: 'italic',
  },
});

export default function Error(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h2" className={classes.text}>
        ERROR 404: Sorry page does not exist
      </Typography>
      <Button
        component={Link}
        to="/"
        type="button"
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Go Home
      </Button>
    </div>
  );
}
