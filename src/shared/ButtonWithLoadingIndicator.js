import React from 'react';
import { CircularProgress, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default ({ loading, children, ...props }) => {
  const classes = useStyles();
  return (
    <Box position="relative">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={loading}
      >
        {children}
      </Button>
      {loading && (
        <div className={classes.buttonProgress} data-testid="button-loading">
          <CircularProgress size={24} />
        </div>
      )}
    </Box>
  );
};
