import * as constants from "./constants";

const initialState = {
  formVisible: false
};

export const transaction = (state = initialState, action) => {
  switch (action.type) {
    case constants.MAKE_FORM_VISIBLE:
      return { ...state, formVisible: true };
    case constants.MAKE_FORM_INVISIBLE:
      return { ...state, formVisible: false };
    default:
      return state;
  }
};
