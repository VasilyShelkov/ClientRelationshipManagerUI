import React from 'react';
import AddUser from './AddUser';
import LoadingSpinner from '../shared/LoadingSpinner';
import StandardForm from '../shared/StandardForm';

const setup = ({ creatingUser = false, queryLoading = false }) => {
  const props = {
    creatingUser,
    queryLoading,
    handleSubmit: () => '',
    error: '',
  };
  const wrapper = shallowWithContext(<AddUser {...props} />);

  return { wrapper, props };
};

describe('src/users/AddUser.js', () => {
  it('renders loading spinner while getting company', () => {
    const { wrapper } = setup({ queryLoading: true });
    expect(wrapper.find(LoadingSpinner).exists()).toBe(true);
    expect(wrapper.find(StandardForm).exists()).toBe(false);
  });

  it('renders form when fully loaded', () => {
    const { wrapper } = setup({ queryLoading: false });
    expect(wrapper.find(LoadingSpinner).exists()).toBe(false);
    expect(wrapper.find(StandardForm).exists()).toBe(true);
  });
});
