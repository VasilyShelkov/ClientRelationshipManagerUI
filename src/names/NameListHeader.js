import React from 'react';
import { cyan500 } from 'material-ui/styles/colors';

export default ({ nameCount, title, Icon }) => (
  <div style={{ textAlign: 'center' }}>
    <Icon style={{ height: '100px', width: '100px' }} color={cyan500} />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h2><span id="protectedNamesCount">{nameCount}</span>{title}</h2>
    </div>
  </div>
);
