import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Container, Typography, Box,
} from '@material-ui/core';
import { Timeline } from 'react-twitter-widgets';
import Slideshow from '../components/Slideshow';
import Slider from '../components/Slider';

const useStyles = makeStyles(() => ({
  // button: {
  //   backgroundColor: _theme.palette.grey[100],
  //   '&:hover': {
  //     backgroundColor: _theme.palette.grey[400],
  //   },
  // },
  headerText: {
    paddingLeft: '127px',
    paddingTop: '30px',
    paddingBottom: '1px',
    fontFamily: "'Bebas Neue', Roboto",
  },
  twitterHeaderText: {
    paddingLeft: '25px',
    paddingTop: '30px',
    paddingBottom: '15px',
    fontFamily: "'Bebas Neue', Roboto",
    fontSize: '29pt',
  },
  genreText: {
    display: 'flex',
    paddingTop: '30px',
    paddingLeft: '67px',
    fontFamily: "'Bebas Neue', Roboto",
  },
  sliderContainer: {
    marginTop: '40px',
    marginBottom: '70px',
  },
  slideshowContainer: {
    marginTop: '40px',
    marginBottom: '40px',
  },

}));

export default function Home(): ReactElement {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <Typography variant="h3" className={classes.headerText}>
            This Week&apos;s Featured Games
          </Typography>
          <div className={classes.slideshowContainer}>
            <Slideshow />
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box>
            <Typography className={classes.twitterHeaderText}>
              This Week&apos;s Featured Gaming Deals
            </Typography>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'Steam',
              }}
              options={{
                theme: 'light',
                height: '400',
                width: '500',
                borderColor: 'secondary',
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h3" className={classes.genreText}>
        Explore game genres!
      </Typography>
      <div className={classes.sliderContainer}>
        <Slider />
      </div>
      <br />
    </Container>
  );
}
