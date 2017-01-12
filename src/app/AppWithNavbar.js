import React from 'react';

import NavBar from './navigation/NavBar';

export default ({ children }) => (
  <div>
    <NavBar />

    <div className="index__content-below-navbar">
      {children}
    </div>
  </div>
);
