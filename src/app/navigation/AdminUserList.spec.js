import React from 'react';
import _ from 'lodash';

import { ListItem } from 'material-ui/List';

import AdminUserList from './AdminUserList';
import LoadingSpinner from '../../shared/LoadingSpinner';

const setup = ({ loading = false, users = [] }) => {
  const props = {
    users,
    loading,
    value: '',
    currentUserId: '1',
    onChange: () => '',
  };
  const wrapper = shallowWithContext(<AdminUserList {...props} />);

  return { wrapper, props };
};

describe('src/app/navigation/AdminUserList', () => {
  it('renders loading spinner when the users are loading', () => {
    const { wrapper } = setup({ loading: true });
    expect(wrapper.find(LoadingSpinner).exists()).to.be.true;
  });

  it('renders the create user link when not loading', () => {
    const { wrapper, props } = setup({ loading: false });

    const createUserLink = wrapper.find(ListItem).first();
    expect(wrapper.find(LoadingSpinner).exists()).to.be.false;
    expect(createUserLink.prop('primaryText')).to.equal('Create New User');
    expect(createUserLink.prop('value')).to.equal(
      JSON.stringify({
        newRoute: '/account/users/add',
        currentUserId: props.currentUserId,
        userIdToShow: props.currentUserId,
      }),
    );
  });

  it('renders default text when there are no users', () => {
    const { wrapper } = setup({ users: [] });

    const listItems = wrapper.find(ListItem);
    const defaultMessage = listItems.last();
    expect(listItems).length.to.be(2);
    expect(defaultMessage.last().prop('secondaryText')).to.equal(
      'There are no other users...',
    );
    expect(defaultMessage.last().prop('disabled')).to.be.true;
  });

  it('renders links to user profiles of the passed in users', () => {
    const users = [
      {
        id: '1',
        firstName: 'vas',
        lastName: 'shelkov',
      },
      {
        id: '2',
        firstName: 'lara',
        lastName: 'phillips',
      },
    ];
    const { wrapper, props } = setup({ users });

    const listItems = wrapper.find(ListItem);
    expect(listItems).length.to.be(3);

    expect(listItems.at(1).key()).to.equal(`profile-${users[0].id}`);
    expect(listItems.at(1).prop('insetChildren')).to.be.true;
    expect(listItems.at(1).prop('primaryText')).to.equal(
      `${users[0].firstName} ${users[0].lastName}`,
    );
    expect(listItems.at(1).prop('value')).to.equal(
      JSON.stringify({
        newRoute: `/account/users/${_.camelCase(
          `${users[0].firstName} ${users[0].lastName}`,
        )}/profile`,
        currentUserId: props.currentUserId,
        userIdToShow: users[0].id,
      }),
    );

    expect(listItems.at(2).key()).to.equal(`profile-${users[1].id}`);
    expect(listItems.at(2).prop('insetChildren')).to.be.true;
    expect(listItems.at(2).prop('primaryText')).to.equal(
      `${users[1].firstName} ${users[1].lastName}`,
    );
    expect(listItems.at(2).prop('value')).to.equal(
      JSON.stringify({
        newRoute: `/account/users/${_.camelCase(
          `${users[1].firstName} ${users[1].lastName}`,
        )}/profile`,
        currentUserId: props.currentUserId,
        userIdToShow: users[1].id,
      }),
    );
  });
});
