import { graphql } from 'react-apollo';
import _ from 'lodash';
import { loader } from 'graphql.macro';

import { APOLLO_MUTATION_RESULT } from '../app/thirdPartyActions';
import AdminUserList from './AdminUserList';

const GetAllUsers = loader('../app/navigation/GetAllUsers.gql');
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
      users: [...previousResult.users, action.result.data.createUser],
    };
  }

  return previousResult;
};

export default graphql(GetAllUsers, {
  props,
  options: ({ params }) => ({ reducer }),
})(AdminUserList);
