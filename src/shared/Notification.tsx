import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import './Notification.css';

interface Props {
  message?: string;
  zDepth: number;
  backgroundColor: string;
  icon?: any;
}
export default ({ message, zDepth, backgroundColor, icon }: Props) => {
  if (message) {
    return (
      <Paper
        className="Form__notification"
        style={{
          backgroundColor,
        }}
        elevation={zDepth}
      >
        {icon}
        <Typography
          variant="headline"
          gutterBottom={true}
          color="inherit"
          style={{ color: 'white' }}
        >
          {message}
        </Typography>
      </Paper>
    );
  }

  return null;
};
