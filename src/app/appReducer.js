import _ from 'lodash';
import { greenA700 } from 'material-ui/styles/colors';

import { APOLLO_MUTATION_RESULT } from './thirdPartyActions';
import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from './appActions';

const initialState = { notificationMessage: '' };
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notificationMessage: action.payload.message,
        notificationColor: action.payload.color
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notificationMessage: initialState.notificationMessage
      };
    case APOLLO_MUTATION_RESULT: {
      if (!_.has(action, 'result.errors')) {
        switch (action.operationName) {
          case 'EditName': {
            const { firstName, lastName } = action.result.data.editName;
            return {
              ...state,
              notificationMessage: `Edited ${firstName} ${lastName}`,
              notificationColor: greenA700
            };
          }
          case 'EditCompany': {
            return {
              ...state,
              notificationMessage: `Edited ${action.result.data.editCompany.name}`,
              notificationColor: greenA700
            };
          }
          case 'CreateUnprotectedName': {
            const { firstName, lastName } = action.result.data.addUnprotectedNameToUser.name;
            return {
              ...state,
              notificationMessage: `Created ${firstName} ${lastName}`,
              notificationColor: greenA700
            };
          }
          case 'RemoveUnprotectedName': {
            return {
              ...state,
              notificationMessage: 'Removed Unprotected Name',
              notificationColor: greenA700
            };
          }
          case 'ProtectName': {
            const { firstName, lastName } = action.result.data.protectNameToUser.name;
            return {
              ...state,
              notificationMessage: `Protected ${firstName} ${lastName}`,
              notificationColor: greenA700
            };
          }
          case 'MakeClient': {
            const { firstName, lastName } = action.result.data.addClientToUser.name;
            return {
              ...state,
              notificationMessage: `${firstName} ${lastName} is now a Client!`,
              notificationColor: greenA700
            };
          }
          case 'RemoveProtectedName': {
            return {
              ...state,
              notificationMessage: 'Removed Protected Name',
              notificationColor: greenA700
            };
          }
          case 'BookCall': {
            const { firstName, lastName } = action.result.data.editProtectedName.name;
            return {
              ...state,
              notificationMessage: `Booked call for ${firstName} ${lastName}`,
              notificationColor: greenA700
            };
          }
          case 'BookClientCall': {
            const { firstName, lastName } = action.result.data.editClient.name;
            return {
              ...state,
              notificationMessage: `Booked meeting for ${firstName} ${lastName}`,
              notificationColor: greenA700
            };
          }
          case 'BookMeeting': {
            const { firstName, lastName } = action.result.data.editProtectedName.name;
            return {
              ...state,
              notificationMessage: `Booked meeting for ${firstName} ${lastName}`,
              notificationColor: greenA700
            };
          }
          case 'BookClientMeeting': {
            const { firstName, lastName } = action.result.data.editClient.name;
            return {
              ...state,
              notificationMessage: `Booked meeting for ${firstName} ${lastName}`,
              notificationColor: greenA700
            };
          }
          case 'MetWithProtected': {
            const { firstName, lastName } = action.result.data.editProtectedName.name;
            return {
              ...state,
              notificationMessage: `Met With ${firstName} ${lastName} successfully`,
              notificationColor: greenA700
            };
          }
          case 'UnprotectName': {
            const { firstName, lastName } = action.result.data.unprotectNameFromUser.name;
            return {
              ...state,
              notificationMessage: `Unprotected ${firstName} ${lastName} successfully`,
              notificationColor: greenA700
            };
          }
          case 'RemoveClient': {
            return {
              ...state,
              notificationMessage: 'Removed Client',
              notificationColor: greenA700
            };
          }
          default:
            return state;
        }
      }

      return state;
    }
    default:
      return state;
  }
};
