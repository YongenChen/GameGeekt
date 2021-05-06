import React, { ReactElement } from 'react';
import {
  Container, makeStyles, Typography, TextField, Button, FormHelperText, Fade, CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { AlertTitle, Alert } from '@material-ui/lab';

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
  alertContainer: {
    textAlign: 'left',
    marginTop: theme.spacing(3),
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
  link: {
    color: 'white',
    '&:visited': {
      color: '#fcdfd8',
    },
  },
  submitButton: {
    height: '45px',
  },
}));

const REGISTER_USER = gql`
mutation registerUser($username: String!,
  $email: String!,
  $password: String!,
  $confirmPassword: String!) {
  registerUser(username: $username,
    email: $email,
    password: $password,
    confirmPassword: $confirmPassword) {
        userid,
        username
  }
}
`;

interface ISignUp {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ISignUpError {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialValues:ISignUp = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const validate = (values:ISignUp) => {
  const errors:ISignUpError = {};
  if (!values.username) {
    errors.username = 'Your username is required';
  }

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
  const [registerUser, { data, error }] = useMutation(REGISTER_USER);
  console.log(data, error);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await registerUser({
        variables: {
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      });
    },
  });

  let errorMessage:string|ReactElement|undefined = error?.message;
  if (errorMessage === 'Username not unique.') {
    errorMessage = (
      <>
        This username already exists —
        {' '}
        <strong>
          Did you want to
          {' '}
          <Link to="/login" className={classes.link}>log in</Link>
          ?
        </strong>
      </>
    );
  }
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
        <Fade
          in={Boolean(errorMessage)}
          timeout={1000}
        >
          <Alert
            severity="error"
            className={classes.alertContainer}
          >
            <AlertTitle>Uh oh!</AlertTitle>
            {errorMessage}
          </Alert>
        </Fade>
        <div className={classes.form}>
          <TextField
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            label="Username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            variant="outlined"
            required
            fullWidth
            disabled={formik.isSubmitting}
          />
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
            disabled={formik.isSubmitting}
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
            disabled={formik.isSubmitting}
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
            disabled={formik.isSubmitting}
          />
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            type="button"
            variant="contained"
            color="secondary"
            disabled={!formik.dirty}
            className={classes.submitButton}
            fullWidth
          >
            {formik.isSubmitting ? <CircularProgress size="20px" color="primary" /> : 'Sign Up'}
          </Button>
          <FormHelperText>
            Have an account? Sign in
            {' '}
            <Link to="/login" className={classes.link}>here</Link>
            .
          </FormHelperText>
        </div>
      </div>
    </Container>
  );
}
