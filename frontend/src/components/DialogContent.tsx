import React, { ReactElement } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Rating } from '@material-ui/lab';

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
  dialogText: {
    color: 'white',
  },
  dialog: {
    backgroundColor: '#22223B',
  },
  ratingContainer: {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
  },
  submitButton: {
    height: '45px',
    color: 'white',
  },
}));

const CREATE_REVIEW = gql`
mutation createReview(
$rating: Float!,
$reviewbody: String!,
$userid: Float!,
$gameid: Float!
){
  createReview(options: {
    rating: $rating,
    reviewbody: $reviewbody,
    userid: $userid,
    gameid: $gameid,
  }) {
    id
  }
}
`;

const CURRENT_USER = gql`
query returnCurrentUser {
  currentUser {
    username,
    id
  }
}
`;

interface IReview {
  reviewbody: string;
  rating: number;
}

interface IReviewError {
  reviewbody?: string;
  rating?: string;
}

interface IVariables {
    rating: number,
    reviewbody: string,
    userid: number,
    gameid: number,
}

interface ICurrentUser {
    username: string;
    id: string;
}

interface IResult {
    currentUser: ICurrentUser;
}

interface IProps {
    gameid: number;
    onClose: () => void;
}

const initialValues:IReview = {
  reviewbody: '',
  rating: 3.5,
};
const validate = (values:IReview) => {
  const errors:IReviewError = {};
  if (!values.reviewbody) {
    errors.reviewbody = 'A review is required';
  }

  if (values.rating < 0 || values.rating > 5) {
    errors.rating = 'A digit between 0 and 5 is required';
  }

  return errors;
};

export default function CreateReview({ gameid, onClose }:IProps): ReactElement {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery<IResult>(CURRENT_USER);
  const [createReview] = useMutation<IVariables>(CREATE_REVIEW, {
    ignoreResults: true,
  });

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      if (!data || !data.currentUser) {
        enqueueSnackbar('You are not logged in!', {
          variant: 'error',
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await createReview({
        variables: {
          userid: +data.currentUser.id,
          gameid: +gameid,
          reviewbody: values.reviewbody,
          rating: values.rating,
        },
      });
      if (response.data) {
        enqueueSnackbar('Successfully created a review!', {
          variant: 'success',
        });
        onClose();
      }
    },
  });

  return (
    <DialogContent className={classes.dialog}>
      <DialogContentText className={classes.dialogText}>
        To create a review, fill in all the necessary blanks.
      </DialogContentText>
      <div
        className={classes.form}
      >
        <TextField
          error={formik.touched.reviewbody && Boolean(formik.errors.reviewbody)}
          helperText={formik.touched.reviewbody && formik.errors.reviewbody}
          label="Comments"
          name="reviewbody"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.reviewbody}
          variant="outlined"
          required
          multiline
          rows={6}
          fullWidth
          disabled={formik.isSubmitting}
          margin="dense"
          color="secondary"
        />
        <FormControl
          className={classes.ratingContainer}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
          disabled={formik.isSubmitting}
          fullWidth
          required
        >
          <FormLabel>
            Rating
          </FormLabel>
          <Rating
            name="rating"
            value={formik.values.rating}
            precision={0.5}
            onChange={(_, newValue) => {
              formik.setFieldValue('rating', newValue);
            }}
          />
        </FormControl>
        <DialogActions>
          <Button
            type="button"
            color="secondary"
            className={classes.submitButton}
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={() => formik.submitForm()}
            color="secondary"
            disabled={!formik.dirty}
            className={classes.submitButton}
            fullWidth
          >
            {formik.isSubmitting ? <CircularProgress size="20px" color="primary" /> : 'Submit'}
          </Button>
        </DialogActions>
      </div>
    </DialogContent>
  );
}
