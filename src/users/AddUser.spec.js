import React from 'react';
import { AddUser } from './AddUser';
import LoadingSpinner from '../shared/LoadingSpinner';
import StandardForm from '../shared/StandardForm';

const setup = ({ queryLoading }) => {
  const props = {
    queryLoading,
    handleSubmit: () => (''),
    error: ''
  };
  const wrapper = shallowWithContext(<AddUser {...props} />);

  return { wrapper, props };
};

describe('src/users/AddUser.js', () => {
  it('renders loading spinner while getting company', () => {
    const { wrapper } = setup({ queryLoading: true });
    expect(wrapper.find(LoadingSpinner).exists()).to.be.true;
    expect(wrapper.find(StandardForm).exists()).to.be.false;
  });

  it('renders form when fully loaded', () => {
    const { wrapper } = setup({ queryLoading: false });
    expect(wrapper.find(LoadingSpinner).exists()).to.be.false;
    expect(wrapper.find(StandardForm).exists()).to.be.true;
  });
});
