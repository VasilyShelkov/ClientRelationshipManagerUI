import * as React from 'react';
import { Paper } from 'material-ui';

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
          borderRadius: '10px',
        }}
        elevation={zDepth}
      >
        {icon}
        <div className="Form__notification__message">{message}</div>
      </Paper>
    );
  }

  return null;
};
