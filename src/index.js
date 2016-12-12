import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './index.scss';


import Home from './Home';
import NotFound from './NotFound';

injectTapEventPlugin();

export const Root = () => (
  <BrowserRouter>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
    </MuiThemeProvider>
  </BrowserRouter>
);

if (!module.hot) render(<Root />, document.querySelector('react'));
