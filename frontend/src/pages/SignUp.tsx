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

interface ISignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ISignUpError {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialValues:ISignUp = { email: '', password: '', confirmPassword: '' };
const validate = (values:ISignUp) => {
  const errors:ISignUpError = {};
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

  if (!values.confirmPassword) {
    errors.confirmPassword = 'You must confirm your password';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export default function SignUp(): ReactElement {
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
          <b>Sign Up</b>
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
          <TextField
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
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
            Sign Up
          </Button>
          <FormHelperText>
            Have an account? Sign in
            {' '}
            <Link to="/login">here</Link>
            .
          </FormHelperText>
        </form>
      </div>
    </Container>
  );
}
