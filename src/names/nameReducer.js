import {
  OPEN_NAME_DETAILS_DRAWER, CLOSE_NAME_DETAILS_DRAWER,
  OPEN_PROTECT_NAME_DIALOG, CLOSE_PROTECT_NAME_DIALOG
} from './nameActions';

const initialState = {
  nameDetailsToShow: false,
  protectNameDialogOpen: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NAME_DETAILS_DRAWER:
      return {
        ...state,
        nameDetailsToShow: action.nameIndex
      };
    case CLOSE_NAME_DETAILS_DRAWER:
      return {
        ...state,
        nameDetailsToShow: false
      };
    case OPEN_PROTECT_NAME_DIALOG:
      return {
        ...state,
        protectNameDialogOpen: true
      };
    case CLOSE_PROTECT_NAME_DIALOG:
      return {
        ...state,
        protectNameDialogOpen: false
      };
    default:
      return state;
  }
};
