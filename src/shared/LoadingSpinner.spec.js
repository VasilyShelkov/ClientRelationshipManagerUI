import React from 'react';
import renderer from 'react-test-renderer';
import LoadingSpinner from './LoadingSpinner';

describe('src/shared/LoadingSpinner.js', () => {
  it('renders the loading spinner', () => {
    expect(renderer.create(<LoadingSpinner />).toJSON())
      .toMatchSnapshot();
  });
});
