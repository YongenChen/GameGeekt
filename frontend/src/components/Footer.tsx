import {
  Container,
  createStyles, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => createStyles({
  container: {
    background: '#22223B',
  },
  listItemStyle: {
    listStyleType: 'none',
  },
  mainFooterStyle: {
    color: 'white',

    width: '100%',
    height: '100px',
  },
  gridStyle: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '1vh',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
    '&:visited': {
      color: '#fcdfd8',
    },
  },
}));

function Footer(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Container maxWidth="lg">
        <Grid container spacing={3} className={classes.mainFooterStyle}>
          <Grid item xs={4} sm={4} lg={4} className={classes.gridStyle}>
            <ul className={classes.listItemStyle}>
              <li>
                <Typography
                  variant="h6"
                  component={Link}
                  to="/about"
                  className={classes.link}
                >
                  About
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={3} sm={3} lg={4}>
            <ul className={classes.listItemStyle}>
              <li>
                <Typography
                  variant="h6"
                  component={Link}
                  to="/contact-us"
                  className={classes.link}
                >
                  Contact Us
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={3} sm={3} lg={4}>
            <ul className={classes.listItemStyle}>
              <li>
                <Typography
                  variant="h6"
                  component={Link}
                  to="/the-team"
                  className={classes.link}
                >
                  The Team
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
