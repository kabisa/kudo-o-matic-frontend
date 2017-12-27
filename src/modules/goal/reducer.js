import * as constants from "./constants";

const initialState = {
  fetching: false,
  error: undefined,
  currentBalance: {
    name: undefined,
    current: undefined,
    amount: undefined,
    "created-at": undefined,
    "updated-at": undefined
  },
  nextGoal: {
    name: undefined,
    amount: 0,
    "achieved-on": undefined,
    "created-at": undefined,
    "updated-at": undefined
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
