import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((_theme) => ({
  button: {
    backgroundColor: _theme.palette.grey[100],
    '&:hover': {
      backgroundColor: _theme.palette.grey[400],
    },
  },
}));

export default function Home(): ReactElement {
  const classes = useStyles();
  return (
    <div>
      home
      <Button variant="contained" className={classes.button}>
        Click
      </Button>
    </div>
  );
}
