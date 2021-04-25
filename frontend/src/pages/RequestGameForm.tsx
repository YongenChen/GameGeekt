import React, { ReactElement } from 'react';
import {
  Container, makeStyles, Typography, TextField, Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
    '& > *:last-child': {
      margin: 0,
    },
  },
}));

export default function RequestGameForm(): ReactElement {
  const classes = useStyles();
  return (
    <Container
      className={classes.rootContainer}
    >
      <div>
        <Typography
          variant="h4"
          className={classes.title}
        >
          <b>Request a game!</b>
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Game name"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Game Genre"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Your rating ( /5):"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Your thoughts on the game:"
            rows={6}
            multiline
            variant="outlined"
            required
            fullWidth
          />
          <Button variant="contained">Submit</Button>
        </form>
      </div>
    </Container>
  );
}
