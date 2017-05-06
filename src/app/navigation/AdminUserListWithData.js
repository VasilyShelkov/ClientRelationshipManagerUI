import { graphql } from 'react-apollo';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../thirdPartyActions';
import GetAllUsers from './GetAllUsers.gql';
import AdminUserList from './AdminUserList';

export const props = ({ ownProps, data: { loading, users } }) => {
  let usersWithoutSelf = [];
  if (!loading) {
    usersWithoutSelf = users.filter(user => user.id !== ownProps.currentUserId);
  }

  return { loading, users: usersWithoutSelf, ...ownProps };
};

export const reducer = (previousResult, action) => {
  if (
    action.type === APOLLO_MUTATION_RESULT &&
    action.operationName === 'CreateUser' &&
    _.has(action, 'result.data.createUser') &&
    !_.has(action, 'result.errors')
  ) {
    return {
      users: [...previousResult.users, action.result.data.createUser]
    };
  }

  return previousResult;
};

export default graphql(GetAllUsers, {
  props,
  options: ({ params }) => ({ reducer })
})(AdminUserList);
