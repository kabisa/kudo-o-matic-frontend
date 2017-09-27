import * as constants from "./constants";

const initialState = {
  fetching: false,
  error: undefined,
  currentBalance: {
    currentAmount: undefined
  },
  nextGoal: {
    nextAmount: undefined,
    nextName: undefined
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
        nextAmount: action.nextAmount,
        nextName: action.nextName,
        fetching: false
      };
    case constants.RECEIVED_API_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
