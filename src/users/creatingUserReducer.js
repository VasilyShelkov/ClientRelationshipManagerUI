import {
  APOLLO_MUTATION_INIT,
  APOLLO_MUTATION_RESULT,
} from '../app/thirdPartyActions';

export default (state = false, action) => {
  switch (action.type) {
    case APOLLO_MUTATION_INIT: {
      if (action.operationName === 'CreateUser') {
        return true;
      }

      return state;
    }
    case APOLLO_MUTATION_RESULT: {
      if (action.operationName === 'CreateUser') {
        return false;
      }

      return state;
    }
    default:
      return state;
  }
};
