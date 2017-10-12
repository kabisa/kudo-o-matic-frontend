import * as constants from "./constants";

const initialState = {
  fetching: false,
  transactions: [],
  error: undefined
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case constants.STARTED_FETCHING_GOAL:
      return { ...state, fetching: true };
    case constants.FINISHED_FETCHING_TRANSACTIONS:
      return { ...state, fetching: false, transactions: action.transactions };
    case constants.RECEIVED_API_ERROR:
      return { ...state, fetching: false, error: action.error };
  }
};
