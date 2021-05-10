import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  button: {
    width: 300,
    height: 90,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    paddingBottom: 90,
    alignItems: 'center',
    paddingLeft: '50px',
  },
  text: {
    paddingTop: 20,
    fontFamily: "'Bebas Neue', Roboto",
    fontSize: 80,
  },
  gridContainer: {
    paddingTop: '10px',
    paddingLeft: '140px',
    justifyContent: 'center',
    minHeight: '100vh',
    paddingBottom: '30px',
  },
  textContainerName: {
    paddingLeft: '45px',
    textAlign: 'center',
    fontWeight: 'bold',
    height: 100,
    width: 50,
  },
  textBody: {
    display: 'inline-block',
    textAlign: 'center',
    height: 100,
    width: 220,
  },
  avatar: {
    width: 200,
    height: 200,
  },
});

export default function TheTeam(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.text} gutterBottom>
        The Team
      </Typography>
      <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        direction="row"
        justify="center"
      >
        <Grid item xs={12} sm={7} md={4}>
          <Avatar alt="Yongen Chen" src="https://www.w3schools.com/howto/img_avatar2.png" className={classes.avatar} />
          <Typography variant="h4" className={classes.textContainerName}>
            Yongen Chen
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.textBody} gutterBottom>
            Yongen led the frontend team. She made the UI wireframe for all the pages and created
            the website structure using various components. She also implemented the
            authentication and created all the forms on the website.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7} md={4}>
          <Avatar alt="David Danialy" src="https://www.w3schools.com/w3images/avatar2.png" className={classes.avatar} />
          <Typography variant="h4" className={classes.textContainerName}>
            David Danialy
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.textBody} gutterBottom>
            David worked on the backend setting up the MYSQL server, Redis cache,
            Apollo Express NodeJS server ,GraphQL schema, resolvers,
            and object-relational mappings.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7} md={4}>
          <Avatar alt="Athena Nguyen" src="https://www.w3schools.com/howto/img_avatar2.png" className={classes.avatar} />
          <Typography variant="h4" className={classes.textContainerName}>
            Athena Nguyen
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.textBody} gutterBottom>
            Athena worked on the Frontend. She worked with Yongen to
            create design and styling choices for how games and reviews
            are displayed with card components.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
