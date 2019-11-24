import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from './thirdPartyActions';
import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from './appActions';

const initialState = { notificationMessage: '' };
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notificationMessage: action.payload.message,
        notificationColor: action.payload.color,
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notificationMessage: initialState.notificationMessage,
      };
    case APOLLO_MUTATION_RESULT: {
      if (!_.has(action, 'result.errors')) {
        switch (action.operationName) {
          case 'EditName': {
            const { firstName, lastName } = action.result.data.editName;
            return {
              ...state,
              notificationMessage: `Edited ${firstName} ${lastName}`,
            };
          }
          case 'EditCompany': {
            const { name } = action.result.data.editCompany;
            return {
              ...state,
              notificationMessage: `Edited ${name}`,
            };
          }
          case 'AddComment': {
            const {
              firstName,
              lastName,
            } = action.result.data.addCommentToName.commentUser;
            return {
              ...state,
              notificationMessage: `Added Comment to ${firstName} ${lastName}`,
            };
          }
          case 'DeleteComment': {
            return {
              ...state,
              notificationMessage: 'Deleted Comment',
            };
          }
          case 'EditComment': {
            return {
              ...state,
              notificationMessage: 'Edited Comment',
            };
          }
          case 'RemoveUnprotectedName': {
            return {
              ...state,
              notificationMessage: 'Removed Unprotected Name',
            };
          }
          case 'RemoveProtectedName': {
            return {
              ...state,
              notificationMessage: 'Removed Protected Name',
            };
          }
          case 'BookCall': {
            const {
              firstName,
              lastName,
            } = action.result.data.editProtectedName.name;
            return {
              ...state,
              notificationMessage: `Booked call for ${firstName} ${lastName}`,
            };
          }
          case 'BookClientCall': {
            const { firstName, lastName } = action.result.data.editClient.name;
            return {
              ...state,
              notificationMessage: `Booked meeting for ${firstName} ${lastName}`,
            };
          }
          case 'BookMeeting': {
            const {
              firstName,
              lastName,
            } = action.result.data.editProtectedName.name;
            return {
              ...state,
              notificationMessage: `Booked meeting for ${firstName} ${lastName}`,
            };
          }
          case 'BookClientMeeting': {
            const { firstName, lastName } = action.result.data.editClient.name;
            return {
              ...state,
              notificationMessage: `Booked meeting for ${firstName} ${lastName}`,
            };
          }
          case 'RemoveClient': {
            return {
              ...state,
              notificationMessage: 'Removed Client',
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
