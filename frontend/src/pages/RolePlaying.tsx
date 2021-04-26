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
import RPData from '../data/RolePlayingData';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '20px',
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
    paddingTop: '10px',
    textShadow: '5px 4px 4px black',
  },
});

export default function RolePlaying(): ReactElement {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" gutterBottom className={classes.genreTitle}>
        Role-Playing
      </Typography>
      <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        justify="space-evenly"
      >
        { RPData.map((RPGame) => (
          <Grid item xs={12} sm={7} md={4}>
            <Card className={classes.root} variant="outlined">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="190"
                  src={RPGame.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    { RPGame.title }
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    { RPGame.description }
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
