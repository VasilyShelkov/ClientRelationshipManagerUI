import React from 'react';
import { cyan500 } from 'material-ui/styles/colors';

export default ({ countId, nameCount, title, Icon }) => (
  <div style={{ textAlign: 'center', marginTop: '10px' }}>
    <Icon style={{ height: '100px', width: '100px' }} color={cyan500} />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h2>
        <span id={countId}>{nameCount}</span>
        {title}
      </h2>
    </div>
  </div>
);
