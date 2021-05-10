import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles({
  button: {
    width: 300,
    height: 90,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center ',
    textAlign: 'center',
    // fontStyle: 'italic',
    fontFamily: "'Work Sans', sans-serif",
    paddingBottom: '20px',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: ' rgba( 172, 166, 215, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 0, 0, 0, 0.37 )',
    minWidth: 700,
    minHeight: 500,
    backdropFilter: 'blur(7 px)',
  },
  icon: {
    width: 70,
    height: 70,
    paddingLeft: 20,
  },
});

export default function ContactUs(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.text} gutterBottom>
        Contact Us
      </Typography>
      <Paper elevation={3} className={classes.paperContainer}>
        <Typography variant="h3" className={classes.textContainer}>
          Emails
          <EmailIcon className={classes.icon} />
        </Typography>
        <Typography variant="h3" className={classes.textContainer}>
          -------------------------
        </Typography>
        <Typography variant="h4" className={classes.textContainer}>
          Yongen Chen: yongen.chen@sjsu.edu
        </Typography>
        <Typography variant="h4" className={classes.textContainer}>
          David Denialy: david.denialy@sjsu.edu
        </Typography>
        <Typography variant="h4" className={classes.textContainer}>
          Athena Nguyen: athena.nguyen@sjsu.edu
        </Typography>
      </Paper>
    </div>
  );
}
