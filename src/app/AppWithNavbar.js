import React from 'react';

import NavBarWithData from './navigation/NavBar';

export default ({ children }) => (
  <div>
    <NavBarWithData />

    <div className="index__content-below-navbar">
      {children}
    </div>
  </div>
);
