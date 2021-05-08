import React, { ReactElement } from 'react';
import {
  Container, makeStyles, Typography, TextField, Button, FormHelperText, Fade, CircularProgress,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { gql, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

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

const SIGNIN_USER = gql`
mutation signIn($username: String!,
  $password: String!) {
  signIn(options: {
    username: $username,
    password: $password
  }) {
        id,
        username
  }
}
`;

interface ILogin {
  username: string;
  password: string;
}

interface ILoginError {
  username?: string;
  password?: string;
}

const initialValues:ILogin = { username: '', password: '' };
const validate = (values:ILogin) => {
  const errors:ILoginError = {};
  if (!values.username) {
    errors.username = 'Your username is required';
  } else if (values.username.length === 0) {
    errors.username = 'Invalid username';
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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [signIn, { error }] = useMutation(SIGNIN_USER, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: gql`
        query returnCurrentUser {
          currentUser {
            username,
            id
          }
        }
        `,
        data: {
          __typename: 'Query',
          currentUser: data?.signIn,
        },
      });
    },
  });

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await signIn({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
      if (response.data) {
        enqueueSnackbar('Successfully logged in!', {
          variant: 'success',
        });
        history.push('/');
      }
    },
  });

  let errorMessage:string|ReactElement|undefined = error?.message;
  if (errorMessage === 'Username not unique.') {
    errorMessage = (
      <>
        This username does not exist —
        {' '}
        <strong>
          Did you want to
          {' '}
          <Link to="/sign-up" className={classes.link}>sign up</Link>
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!formik.dirty}
            className={classes.submitButton}
            fullWidth
          >
            {formik.isSubmitting ? <CircularProgress size="20px" color="primary" /> : 'Log In'}
          </Button>
          <FormHelperText>
            Don&quot;t have an account? Sign up
            {' '}
            <Link to="/sign-up" className={classes.link}>here</Link>
            .
          </FormHelperText>
        </form>
      </div>
    </Container>
  );
}
