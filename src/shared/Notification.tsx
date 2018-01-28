import * as React from 'react';
import { Paper, Typography } from 'material-ui';

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
        <Typography type="display3" gutterBottom={true} color="primary">
          {message}
        </Typography>
      </Paper>
    );
  }

  return null;
};
