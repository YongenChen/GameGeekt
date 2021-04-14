import React, { ReactElement } from 'react';
import {
  Container, makeStyles, Typography, TextField, Button, FormHelperText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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

export default function Login(): ReactElement {
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
          <b>Log In</b>
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            autoComplete="email"
            required
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
          />
          <Button variant="contained">Log In</Button>
          <FormHelperText>
            Don&quot;t have an account? Sign up
            {' '}
            <Link to="/sign-up">here</Link>
            .
          </FormHelperText>
        </form>
      </div>
    </Container>
  );
}
