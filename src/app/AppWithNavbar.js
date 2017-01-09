import React from 'react';

import NavBar from './NavBar';

export default ({ children, width }) => (
  <div>
    <NavBar width={width} />

    <div className="index__content-below-navbar">
      {children}
    </div>
  </div>
);
