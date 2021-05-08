import { gql, useQuery } from '@apollo/client';
import {
  CircularProgress, Container, List, ListItem, makeStyles, Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Genres } from '../../utils/enums';

const useStyles = makeStyles(() => ({
  rootContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
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
    id, reviewer, rating, reviewbody,
  },
}: IGameReviewItemProps): ReactElement {
  return (
    <ListItem>
      {id}
      {JSON.stringify(reviewer)}
      {' '}
      {reviewbody}
      {' '}
      {rating}
    </ListItem>
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
        <List>
          {data.game.reviews.map((gameReview) => <GameReviewItem gameReview={gameReview} />)}
        </List>
      );
    } else {
      content = (
        <Typography variant="h4">
          There are currently no reviews for this game.
        </Typography>
      );
    }
  }
  if (error) {
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
