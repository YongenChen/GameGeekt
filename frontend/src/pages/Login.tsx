import React, { ReactElement } from 'react';
import {
  Container, makeStyles, Typography, TextField, Button, FormHelperText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
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

interface ILogin {
  email: string;
  password: string;
}

interface ILoginError {
  email?: string;
  password?: string;
}

const initialValues:ILogin = { email: '', password: '' };
const validate = (values:ILogin) => {
  const errors:ILoginError = {};
  if (!values.email) {
    errors.email = 'Your email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Your password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be at least 6 characters or more';
  }

  return errors;
};

export default function Login(): ReactElement {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            variant="outlined"
            type="email"
            autoComplete="email"
            required
            fullWidth
          />
          <TextField
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            variant="outlined"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
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
