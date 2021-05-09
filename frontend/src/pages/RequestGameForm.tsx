import React, { ReactElement } from 'react';
import {
  Container,
  makeStyles,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormHelperText,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { AlertTitle, Alert } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { Genres } from '../utils/enums';

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
  genreContainer: {
    width: '100%',
    textAlign: 'left',
  },
  submitButton: {
    height: '45px',
  },
}));

const CREATE_GAME = gql`
mutation createGame(
  $name: String!,
  $genre: Genre!,
  $description: String!,
  $imgLink: String) {
    createGame(
      options: {
        name: $name,
        genre: $genre,
        description: $description,
        imgLink: $imgLink
      }) {
          id,
          createdAt,
          updatedAt,
          deletedAt,
          name,
          genre,
          description
  }
}
`;

interface IRequestGame {
  name: string;
  genre: Genres;
  description: string;
  imgLink?: string;
}

interface IRequestGameError {
  name?: string;
  genre?: string;
  description?: string;
  imgLink?: string;
}

const initialValues:IRequestGame = {
  name: '',
  genre: Genres.ADVENTURE,
  description: '',
  imgLink: '',
};

const validate = (values:IRequestGame) => {
  const errors:IRequestGameError = {};
  if (!values.name) {
    errors.name = 'Please enter the name of the game';
  }

  if (!values.genre) {
    errors.genre = 'Please enter a game genre';
  } else if (!(values.genre in Genres)) {
    errors.genre = 'Invalid genre';
  }

  if (!values.description) {
    errors.description = 'You must provide a game description';
  }

  return errors;
};

interface Genre {
  label: string;
  value: Genres;
}

const genreList: Genre[] = [
  {
    label: 'Adventure',
    value: Genres.ADVENTURE,
  },
  {
    label: 'First Person Shooter',
    value: Genres.FPS,
  },
  {
    label: 'Massively Multiplayer Online',
    value: Genres.MMO,
  },
  {
    label: 'Mobile Games',
    value: Genres.MOBILE,
  },
  {
    label: 'Multiplayer Online Battle Arena',
    value: Genres.MOBA,
  },
  {
    label: 'Puzzle',
    value: Genres.PUZZLE,
  },
  {
    label: 'Real-Time Strategy',
    value: Genres.RTS,
  },
  {
    label: 'Role-Playing',
    value: Genres.RP,
  },
  {
    label: 'Simulation',
    value: Genres.SIMULATION,
  },
  {
    label: 'Sports',
    value: Genres.SPORTS,
  },
];

export default function RequestGameForm(): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [createGame, { error }] = useMutation(CREATE_GAME);

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await createGame({
        variables: {
          name: values.name,
          genre: values.genre,
          description: values.description,
          imgLink: values.imgLink,
        },
      });
      if (response.data) {
        enqueueSnackbar(`Successfully requested "${values.name}"`, {
          variant: 'success',
        });
        history.push('/');
      }
    },
  });

  let errorMessage:string|ReactElement|undefined = error?.message;
  if (errorMessage === 'Game is not unique.') {
    errorMessage = (
      <>
        This game already exists
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
          <FormControl
            variant="outlined"
            className={classes.genreContainer}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            disabled={formik.isSubmitting}
            fullWidth
            required
          >
            <InputLabel>Genre</InputLabel>
            <Select
              value={formik.values.genre}
              onChange={formik.handleChange}
              label="Genre"
              name="genre"
              onBlur={formik.handleBlur}
            >
              {genreList.map((genre) => (
                <MenuItem key={genre.value} value={genre.value}>
                  {genre.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.touched.genre && formik.errors.genre}</FormHelperText>
          </FormControl>
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
            error={formik.touched.imgLink && Boolean(formik.errors.imgLink)}
            helperText={formik.touched.imgLink && formik.errors.imgLink}
            label="Link Image of Game (Optional)"
            name="imgLink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imgLink}
            variant="outlined"
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
