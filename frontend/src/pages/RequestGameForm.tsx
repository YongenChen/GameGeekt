import React, { ReactElement } from 'react';
import {
  Container, makeStyles, Typography, TextField, Button, CircularProgress, FormHelperText, Fade,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
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
  submitButton: {
    height: '45px',
  },
}));

const ADD_GAME = gql`
mutation addGame($name: String!,
  $genre: String!,
  $rating: String!,
  $description: String!,
  $imglink: String!) {
  addGame(name: $name,
    genre: $genre,
    rating: $rating,
    description: $description,
    imglink: $imglink) {
        gameid,
        name
  }
}
`;

interface IRequestGame {
  name: string;
  genre: string;
  rating: string;
  description: string;
  imglink: string;
}

interface IRequestGameError {
  name?: string;
  genre?: string;
  rating?: string;
  description?: string;
  imglink?: string;
}

const initialValues:IRequestGame = {
  name: '',
  genre: '',
  rating: '',
  description: '',
  imglink: '',
};

const validate = (values:IRequestGame) => {
  const errors:IRequestGameError = {};
  if (!values.name) {
    errors.name = 'Please enter the name of the game';
  }

  if (!values.genre) {
    errors.genre = 'Please enter a game genre';
  }

  if (!values.rating) {
    errors.rating = 'Please enter a rating out of /5';
  }

  if (!values.description) {
    errors.description = 'You must provide a game description';
  }

  return errors;
};

export default function RequestGameForm(): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const [addGame, { error }] = useMutation(ADD_GAME, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: gql`
        query returnGame {
          game {
              gameid,
              name,
          }
        }
        `,
        data: {
          __typename: 'Query',
          game: data?.addGame,
        },
      });
    },
  });

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await addGame({
        variables: {
          name: values.name,
          genre: values.genre,
          rating: values.rating,
          description: values.description,
          imglink: values.imglink,
        },
      });
      if (response.data) {
        history.push('/');
      }
    },
  });

  let errorMessage:string|ReactElement|undefined = error?.message;
  if (errorMessage === 'Game is not unique.') {
    errorMessage = (
      <>
        This game already exists —
        {' '}
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
          <b>Game Request Form</b>
        </Typography>
        <div className={classes.form}>
          <TextField
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            label="Name of Game"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            variant="outlined"
            required
            fullWidth
            disabled={formik.isSubmitting}
          />
          <TextField
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
            label="Game Genre"
            name="genre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.genre}
            variant="outlined"
            required
            fullWidth
            disabled={formik.isSubmitting}
          />
          <TextField
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
            label="Rating out of /5"
            name="rating"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
            variant="outlined"
            required
            fullWidth
            disabled={formik.isSubmitting}
          />
          <TextField
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            label="Game Description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            rows={6}
            multiline
            variant="outlined"
            required
            fullWidth
            disabled={formik.isSubmitting}
          />
          <TextField
            error={formik.touched.imglink && Boolean(formik.errors.imglink)}
            helperText={formik.touched.imglink && formik.errors.imglink}
            label="Link Image of Game (Optional)"
            name="imglink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imglink}
            variant="outlined"
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
            {formik.isSubmitting ? <CircularProgress size="20px" color="primary" /> : 'Submit'}
          </Button>
          <FormHelperText>
            Submit your first review!
          </FormHelperText>
        </div>
      </div>
    </Container>
  );
}
