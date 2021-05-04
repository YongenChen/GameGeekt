import { gql, useQuery } from '@apollo/client';
import {
  CircularProgress, Container, List, ListItem, makeStyles, Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

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

interface IVariables {
    gameid: number;
}

interface IParams {
    id: string;
}

interface IGameReview {
    reviewid: number;
    gameid: number;
    reviewer: number;
    rating: string;
    reviewbody: string;
}

interface IResponse {
    gameReviews: IGameReview[];
}

interface IGameReviewItemProps {
    gameReview: IGameReview;
}

const GET_GAME_REVIEWS = gql`
query getGameReviews($gameid: Int) {
    gameReviews(gameid: $gameid) {
      reviewid
      gameid
      reviewer
      rating
      reviewbody
    }
  }
  `;

function GameReviewItem({
  gameReview: {
    reviewid, gameid, reviewer, rating,
  },
}: IGameReviewItemProps): ReactElement {
  return (
    <ListItem>
      {reviewid}
      {gameid}
      {' '}
      {reviewer}
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
      gameid: +id,
    },
  });

  let content = (
    <CircularProgress />
  );

  if (!loading && data) {
    if (data.gameReviews.length > 0) {
      content = (
        <List>
          {data.gameReviews.map((gameReview) => <GameReviewItem gameReview={gameReview} />)}
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
