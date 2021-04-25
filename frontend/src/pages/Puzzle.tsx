import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Grid } from '@material-ui/core';
import PuzzleData from '../data/PuzzleData';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
    justifyContent: 'center',
  },
  root: {
    background: '#C7D2FE45',
    minWidth: 300,
    minHeight: 400,
    backdropFilter: 'blur(20px)',
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

export default function Puzzle(): ReactElement {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" gutterBottom className={classes.genreTitle}>
        Puzzle
      </Typography>
      <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        justify="space-evenly"
      >
        { PuzzleData.map((PuzzleGame) => (
          <Grid item xs={12} sm={7} md={4}>
            <Card className={classes.root} variant="outlined">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="190"
                  src={PuzzleGame.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    { PuzzleGame.title }
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    { PuzzleGame.description }
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
          </Grid>
        ))}
      </Grid>
    </>
  );
}
