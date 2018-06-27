import * as constants from "./constants";

const initialState = {
  fetching: false,
  error: null,
  currentBalance: {
    name: null,
    current: null,
    amount: 0,
    "created-at": null,
    "updated-at": null
  },
  nextGoal: {
    name: null,
    amount: 0,
    "achieved-on": null,
    "created-at": null,
    "updated-at": null
  }
};

export const goal = (state = initialState, action) => {
  switch (action.type) {
    case constants.STARTED_FETCHING_GOAL:
      return { ...state, fetching: true };
    case constants.FINISHED_FETCHING_GOAL_STATE:
      return {
        ...state,
        currentBalance: action.currentBalance,
        nextGoal: action.nextGoal,
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
