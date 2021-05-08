import React, { ReactElement } from 'react';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Genres } from '../utils/enums';

interface IGame {
  id: number;
  name: string;
  genre: Genres;
  description: string;
  imgLink: string;
}

interface IQuery {
  searchGamesByGenre: IGame[];
}

interface IGameVar {
  genre: Genres;
}

const GET_GAMES = gql`
  query GetGames($genre: Genre!){
    searchGamesByGenre(genre: $genre){
      id,
      name,
      genre,
      description,
      imgLink
    }
  }
  `;

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
    justifyContent: 'center',
  },
  root: {
    background: ' rgba( 172, 166, 215, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
    minWidth: 300,
    minHeight: 400,
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
  },
});

export default function RealTimeStrategy(): ReactElement {
  const classes = useStyles();
  const { data, loading, error } = useQuery<IQuery, IGameVar>(
    GET_GAMES, { variables: { genre: Genres.RTS } },
  );
  if (loading) {
    return (<div>Loading...</div>);
  }
  if (error) {
    console.log(error);
    return (<div>Error...</div>);
  }
  if (!data) {
    return (<div>no data</div>);
  }
  return (
    <div>
      <Typography variant="h2" gutterBottom className={classes.genreTitle}>
        Real-Time Strategy
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
                  <CardMedia
                    component="img"
                    height="190"
                    src={game.imgLink}
                  />
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
                      Rating:
                    </Typography>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarHalfIcon />
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
