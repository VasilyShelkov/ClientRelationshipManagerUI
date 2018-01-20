import _ from 'lodash';

import { removeNameFromList } from '../../nameListShapeShifter';
import { APOLLO_MUTATION_RESULT } from '../../../../app/thirdPartyActions';

export default nameListType => (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveProtectedName':
        if (
          _.has(action, 'result.data.removeProtectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult,
            action.variables.protectedId,
            nameListType,
          );
        }
        break;
      case 'UnprotectName':
        if (
          _.has(action, 'result.data.unprotectNameFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult,
            action.variables.nameId,
            nameListType,
            true,
          );
        }
        break;
      case 'MakeClient':
        if (
          _.has(action, 'result.data.addClientToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult,
            action.variables.nameId,
            nameListType,
            true,
          );
        }
        break;
      case 'MetWithProtected':
        if (
          _.has(action, 'result.data.editProtectedName') &&
          !_.has(action, 'result.errors')
        ) {
          if (nameListType === 'metWithProtected') {
            return {
              ...previousResult,
              user: {
                ...previousResult.user,
                metWithProtected: [
                  action.result.data.editProtectedName,
                  ...previousResult.user.metWithProtected,
                ],
              },
            };
          }

          return removeNameFromList(
            previousResult,
            action.variables.protectedId,
            nameListType,
          );
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};
