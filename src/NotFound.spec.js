import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from './NotFound';

describe('src/NotFound.js', () => {
  it('renders the Not Found page', () => {
    expect(
      renderer.create(<NotFound />).toJSON()
    ).toMatchSnapshot();
  });
});
