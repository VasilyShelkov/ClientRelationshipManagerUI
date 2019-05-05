import _ from 'lodash';
import {
  APOLLO_MUTATION_RESULT,
  showSuccessNotification,
} from './thirdPartyActions';

export default store => next => action => {
  next(action);
  if (action.type === APOLLO_MUTATION_RESULT) {
    if (!_.has(action, 'result.errors')) {
      switch (action.operationName) {
        case 'CreateUnprotectedName': {
          const {
            firstName,
            lastName,
          } = action.result.data.addUnprotectedNameToUser.name;
          store.dispatch(
            showSuccessNotification({
              title: 'Created unprotected',
              firstName,
              lastName,
            }),
          );
          break;
        }
        case 'ProtectName': {
          const {
            firstName,
            lastName,
          } = action.result.data.protectNameToUser.name;
          store.dispatch(
            showSuccessNotification({
              title: 'Protected name',
              firstName,
              lastName,
            }),
          );
          break;
        }
        case 'MetWithProtected': {
          const {
            firstName,
            lastName,
          } = action.result.data.editProtectedName.name;
          store.dispatch(
            showSuccessNotification({
              title: 'Met with protected',
              firstName,
              lastName,
            }),
          );
          break;
        }
        case 'MakeClient': {
          const {
            firstName,
            lastName,
          } = action.result.data.addClientToUser.name;
          store.dispatch(
            showSuccessNotification({
              title: 'Congrats on the new client',
              firstName,
              lastName,
            }),
          );
          break;
        }
        case 'UnprotectName': {
          const {
            firstName,
            lastName,
          } = action.result.data.unprotectNameFromUser.name;
          store.dispatch(
            showSuccessNotification({
              title: 'Unprotected name',
              firstName,
              lastName,
            }),
          );
          break;
        }
        default:
          return;
      }
    }
  }
};
