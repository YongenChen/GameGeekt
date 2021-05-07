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

export default function GameRequestSuccess(): ReactElement {
  const classes = useStyles();
  return (
    <div>
      Success! Your game has been submitted and is now in queue for review.
      <Button
        variant="contained"
        className={classes.button}
      >
        Return to Homepage
      </Button>
    </div>
  );
}
