import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Hot } from 'react-hot-loader';

import Root from '../src/app/root';

const render = (Component) => {
  ReactDOM.render(
    <Hot key={Math.random()}><Component /></Hot>,
    document.querySelector('react')
  );
};

render(Root);

module.hot.accept('../src/app/root.js', () => {
  const NewApp = require('../src/app/root.js').default
  render(NewApp)
});
