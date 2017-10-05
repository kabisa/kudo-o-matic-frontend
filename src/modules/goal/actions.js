import * as constants from "./constants";
import { fetchNextGoal, fetchCurrentBalance } from "./apiClient";

export const startedFetchingGoal = () => {
  return {
    type: constants.STARTED_FETCHING_GOAL,
    fetching: true
  };
};

export const finishedFetchingGoal = (currentBalance, nextGoal) => {
  return {
    type: constants.FINISHED_FETCHING_GOAL_STATE,
    currentBalance: currentBalance,
    nextGoal: nextGoal
  };
};

export const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
  };
};

export const fetchCurrentGoalState = apiToken => {
  return dispatch => {
    dispatch(startedFetchingGoal);

    return Promise.all([
      fetchCurrentBalance(apiToken),
      fetchNextGoal(apiToken)
    ]).then(values => {
      return dispatch(finishedFetchingGoal(values[0], values[1]));
    });
  };
};
