import { gql, useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress, Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import { useParams, Link } from 'react-router-dom';
import { Genres } from '../../utils/enums';

const useStyles = makeStyles(() => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
  },
  root: {
    background: ' rgba( 172, 166, 215, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
    minWidth: 100,
    minHeight: 100,
    backdropFilter: 'blur(7 px)',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    WebkitBackdropFilter: 'blur(7.0px)',
  },
  avatar: {
    width: '45px',
    height: '45px',
    backgroundColor: '#bcabf590',
  },
  gridContainer: {
    display: 'flex',
    paddingTop: '15px',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardheader: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '18px',
    fontFamily: "'Noto Sans JP', sans-serif",
  },
  cardContentTitle: {
    fontWeight: 'bold',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontFamily: "'Questrial', sans-serif",
    fontSize: '17px',
  },
  button: {
    background: ' rgba( 172, 166, 215, 0.70 )',
    height: '50px',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
    backdropFilter: 'blur(7 px)',
    borderRadius: '5px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    WebkitBackdropFilter: 'blur(7.0px)',
  },
}));

interface IReviewer {
  id: number;
  username: string;
}

interface IGameReview {
  id: number;
  reviewer: IReviewer;
  rating: number;
  reviewbody: string;
}

interface IGame {
  id: number;
  name: string;
  genre: Genres;
  reviews: IGameReview[];
  imgLink: string;
  description: string;
}

interface IVariables {
    id: number;
}

interface IParams {
    id: string;
}

interface IResponse {
    game: IGame;
}

interface IGameReviewItemProps {
    gameReview: IGameReview;
}

const GET_GAME_REVIEWS = gql`
query getGameReview($id: Int!) {
  game(id: $id) {
    id,
    name,
    genre,
    description,
    imgLink,
    reviews {
      id,
      rating,
      reviewbody,
      reviewer {
        id,
        username
      }
    }
  }
}
`;

// ADD A BUTTON CALLED "ADD REVIEW" and  dialog component (form) that allows you
// to submit data to server with graphql

// Make the dialog component first then embed it in button on click
function GameReviewItem({
  gameReview: {
    reviewer, rating, reviewbody,
  },
}: IGameReviewItemProps): ReactElement {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={7} md={4}>
        <Card className={classes.root} variant="outlined">
          <CardHeader
            className={classes.cardheader}
            avatar={
              <Avatar className={classes.avatar}><FaceIcon /></Avatar>
            }
            classes={{
              title: classes.cardheader,
              subheader: classes.cardheader,
            }}
            title={JSON.parse(JSON.stringify(reviewer.username))}
            subheader={`Rating: ${rating}/5`}
          />
          <CardContent>
            <Typography className={classes.cardContentTitle} variant="h5" component="h5">
              Review:
            </Typography>
            <Typography className={classes.cardContent} variant="body1" component="h3">
              {reviewbody}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

function Game(): ReactElement {
  const classes = useStyles();
  const { id } = useParams<IParams>();
  const { data, loading, error } = useQuery<IResponse, IVariables>(GET_GAME_REVIEWS, {
    variables: {
      id: +id,
    },
  });
  console.log(id);
  let content = (
    <CircularProgress />
  );

  if (!loading && data) {
    if (data.game.reviews.length > 0) {
      content = (
        <>
          <Typography className={classes.cardContentTitle} variant="h2" component="h3">
            {data.game.name}
          </Typography>
          <Button
            component={Link}
            to={`/Create-Review/${data.game.id}`}
            type="button"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Create a review!
          </Button>
          <Grid
            container
            spacing={6}
            className={classes.gridContainer}
            justify="flex-start"
          >
            {data.game.reviews.map((gameReview) => <GameReviewItem gameReview={gameReview} />)}
          </Grid>
        </>
      );
    } else {
      content = (
        <>
          <Typography variant="h4">
            There are currently no reviews for
            {' '}
            {data.game.name}
            .
          </Typography>
          <Button
            component={Link}
            to={`/Create-Review/${data.game.id}`}
            type="button"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Create a review!
          </Button>
        </>
      );
    }
  }
  if (error) {
    console.log(error);
    content = (
      <Typography variant="h2">
        Sorry, this request is invalid.
      </Typography>
    );
  }

  return (
    <Container className={classes.rootContainer}>
      {content}
    </Container>
  );
}

export default Game;
