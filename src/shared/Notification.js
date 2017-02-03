import React from 'react';
import Paper from 'material-ui/Paper';

export default ({ message, zDepth, backgroundColor, icon }) => {
  if (message) {
    return (
      <Paper
        className="Form__notification"
        style={{
          backgroundColor,
          borderRadius: '10px'
        }}
        zDepth={zDepth}
      >
        {icon}
        <div className="Form__notification__message">{message}</div>
      </Paper>
    );
  }

  return null;
};
