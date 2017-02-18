import { OPEN_NAME_DETAILS_DRAWER, CLOSE_NAME_DETAILS_DRAWER } from './nameActions';

const initialState = {
  nameDetailsToShow: false
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
    default:
      return state;
  }
};
