import { gql, useQuery } from '@apollo/client';
import {
  CircularProgress, Container, makeStyles, Typography, Grid,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';

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
    reviewerid: number;
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
      reviewerid
      rating
      reviewbody
    }
  }
  `;

// ADD A BUTTON CALLED "ADD REVIEW" and  dialog component (form) that allows you
// to submit data to server with graphql

// Make the dialog component first then embed it in button on click
function GameReviewItem({
  gameReview: {
    reviewerid, rating, reviewbody,
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
            title={`User ${reviewerid}`}
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
      gameid: +id,
    },
  });

  let content = (
    <CircularProgress />
  );

  if (!loading && data) {
    if (data.gameReviews.length > 0) {
      content = (
        <>
          <Typography className={classes.cardContentTitle} variant="h2" component="h3">
            Game Reviews
            {' '}
            { id }
          </Typography>
          <Grid
            container
            spacing={6}
            className={classes.gridContainer}
            justify="flex-start"
          >
            {data.gameReviews.map((gameReview) => <GameReviewItem gameReview={gameReview} />)}
          </Grid>
        </>
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
