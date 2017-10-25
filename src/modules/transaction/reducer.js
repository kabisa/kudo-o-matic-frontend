import * as constants from "./constants";

const initialState = {
  addingTransaction: false,
  formVisible: false,
  error: undefined
};

export const transaction = (state = initialState, action) => {
  switch (action.type) {
    case constants.MAKE_FORM_VISIBLE:
      return { ...state, formVisible: true };
    case constants.MAKE_FORM_INVISIBLE:
      return { ...state, formVisible: false };
    case constants.STARTED_ADDING_TRANSACTION:
      return { ...state, addingTransaction: true };
    case constants.FINISHED_ADDING_TRANSACTION:
      return { ...state, addingTransaction: false };
    case constants.RECEIVED_API_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
