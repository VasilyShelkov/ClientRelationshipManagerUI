import React from 'react';
import { UnprotectedNames } from './UnprotectedNames';
import LoadingSpinner from '../../shared/LoadingSpinner';
import NamesList from '../NamesList';

const setup = ({ loading = false, names = [] }) => {
  const props = {
    loading,
    names
  };

  const wrapper = shallow(<UnprotectedNames {...props} />);
  return { wrapper, props };
};

xdescribe('src/names/UnprotectedNames.js', () => {
  it('renders the loading spinner when getting data', () => {
    const { wrapper } = setup({ loading: true });
    expect(wrapper.find(LoadingSpinner).exists()).to.be.true;
  });

  it('renders NamesList when not loading', () => {
    const names = [{ id: 1 }, { id: 2 }];
    const { wrapper } = setup({ loading: false, names });

    expect(wrapper.find(LoadingSpinner).exists()).to.be.false;

    const namesListComponent = wrapper.find(NamesList);
    expect(namesListComponent.exists()).to.be.true;
    expect(namesListComponent.prop('names')).to.equal(names);
  });
});
