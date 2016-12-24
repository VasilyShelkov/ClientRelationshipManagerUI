import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router';
import NotFound from './NotFound';

describe('src/NotFound.js', () => {
  it('renders the Not Found page', () => {
    expect(renderer.create(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    ).toJSON())
      .toMatchSnapshot();
  });
});
