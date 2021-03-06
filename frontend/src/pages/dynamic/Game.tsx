import { gql, useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress, Container, DialogTitle, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { Genres } from '../../utils/enums';
import DialogContent from '../../components/DialogContent';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
  },
  noReviewMessage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '65vh',
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
    paddingBottom: '30px',
  },
  cardheader: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '18px',
    fontFamily: "'Noto Sans JP', sans-serif",
  },
  genreTitle: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    textShadow: '5px 4px 4px black',
    fontFamily: "'Bebas Neue', Roboto",
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
  dialog: {
    background: '#22223B',
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
  img: {
    maxWidth: '50%',
    marginTop: theme.spacing(3),
  },
  description: {
    marginTop: theme.spacing(3),
    maxHeight: 100,
    overflowY: 'auto',
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

function GameReviewItem({
  gameReview: {
    reviewer,
    rating,
    reviewbody,
  },
}: IGameReviewItemProps): ReactElement {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
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
          title={reviewer.username}
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
  );
}

function Game(): ReactElement {
  const classes = useStyles();
  const { id } = useParams<IParams>();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const {
    data, loading, error, refetch,
  } = useQuery<IResponse, IVariables>(GET_GAME_REVIEWS, {
    variables: {
      id: +id,
    },
    fetchPolicy: 'no-cache',
  });

  const handleClose = () => {
    setOpen(false);
    refetch();
  };
  let content = (
    <CircularProgress />
  );

  if (!loading && data) {
    const title = (
      <>
        {data.game.imgLink && (
        <img
          className={classes.img}
          src={data.game.imgLink}
          alt={`${data.game.name} Reviews`}
        />
        )}
        <Typography className={classes.genreTitle} variant="h2">
          {`${data.game.name} Reviews`}
        </Typography>
      </>
    );
    let reviewContent = null;
    if (data.game.reviews.length > 0) {
      reviewContent = (
        <Grid
          container
          spacing={6}
          className={classes.gridContainer}
          justify="flex-start"
        >
          {data.game.reviews.map((gameReview) => (
            <GameReviewItem
              key={gameReview.id}
              gameReview={gameReview}
            />
          ))}
        </Grid>
      );
    } else {
      reviewContent = (
        <div className={classes.noReviewMessage}>
          <Typography variant="h4">
            There are currently no reviews for
            {' '}
            {data.game.name}
            .
          </Typography>
        </div>
      );
    }
    content = (
      <>
        {title}
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleClickOpen}
        >
          Create a review!
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className={classes.dialog}>New Review</DialogTitle>
          <DialogContent gameid={data.game.id} onClose={handleClose} />
        </Dialog>
        <Typography variant="body1" className={classes.description}>
          {data.game.description}
        </Typography>
        {reviewContent}
      </>
    );
  }
  if (!loading && error) {
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
