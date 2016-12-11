import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

import './index.scss';
import Home from './Home';
import NotFound from './NotFound';

export const Root = () => (
  <BrowserRouter>
    <div>
      <div className="text--xlarge">
        Welcome to the React-Hot-Dev-Starter-Kit
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>

      <hr />

      <Match exactly pattern="/" component={Home} />

      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
);

if (!module.hot) render(<Root />, document.querySelector('react'));
