import * as constants from "./constants";

const initialState = {
  fetching: false,
  error: null,
  userstats: {
    sent: null,
    received: null,
    total: null
  }
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case constants.STARTED_FETCHING_USERSTATS:
      return { ...state, fetching: true };
    case constants.FINISHED_FETCHING_USERSTATS:
      return {
        ...state,
        userstats: action.userstats,
        fetching: false
      };
    case constants.RECEIVED_API_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      };
    default:
      return state;
  }
};
