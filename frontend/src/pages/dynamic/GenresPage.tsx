import React, { ReactElement } from 'react';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ImageIcon from '@material-ui/icons/Image';
import { Genres } from '../../utils/enums';

interface IGame {
  id: number;
  name: string;
  genre: Genres;
  description: string;
  imgLink: string;
  reviews: IGameReview[];
}

interface IGameReview {
  id: number;
  rating: number;
  reviewbody: string;
}

interface IQuery {
  searchGamesByGenre: IGame[];
}

interface IGameVar {
  genre: Genres;
}

interface IParams {
  genre: Genres;
}

const GET_GAMES = gql`
  query GetGames($genre: Genre!){
    searchGamesByGenre(genre: $genre){
      id,
      name,
      genre,
      description,
      imgLink,
      reviews{
        id,
        reviewbody
      }
    }
  }
  `;

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
    justifyContent: 'center',
    minHeight: '100vh',
    paddingBottom: '30px',
  },
  imageContainer: {
    maxHeight: '250px',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    height: '135px',
    width: '135px',
  },
  root: {
    background: ' rgba( 172, 166, 215, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
    minWidth: 300,
    minHeight: 373,
    backdropFilter: 'blur(7 px)',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    WebkitBackdropFilter: 'blur(7.0px)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  genreTitle: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    textShadow: '5px 4px 4px black',
    fontFamily: "'Bebas Neue', Roboto",
  },
});

function GenresPage(): ReactElement {
  const classes = useStyles();
  const { genre } = useParams<IParams>();
  const { data, loading, error } = useQuery<IQuery, IGameVar>(
    GET_GAMES, {
      variables:
      {
        genre,
      },
    },
  );
  if (loading) {
    return (<div>Loading...</div>);
  }
  if (error) {
    return (<div>Error...</div>);
  }
  if (!data) {
    return (<div>no data</div>);
  }
  return (
    <div>
      <Typography variant="h1" gutterBottom className={classes.genreTitle}>
        { genre }
      </Typography>
      <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        justify="space-evenly"
      >
        {data.searchGamesByGenre.map((game) => (
          <Grid item xs={12} sm={7} md={4}>
            <Link underline="none" component={RouterLink} to={`/games/${game.id}`}>
              <Card className={classes.root} variant="outlined">
                <CardActionArea>
                  <div className={classes.imageContainer}>
                    {game.imgLink ? (
                      <CardMedia
                        component="img"
                        height="250"
                        src={game.imgLink}
                        alt={game.name}
                      />
                    ) : (
                      <ImageIcon className={classes.imageIcon} />
                    )}
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      { game.name }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      { game.description }
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" component="p">
                      Ratings:
                      {' '}
                      { game.reviews.length }
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GenresPage;
