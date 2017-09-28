import * as constants from "./constants";
import {
  fetchCurrentGoalText,
  fetchCurrentGoal,
  fetchCurrentAmount
} from "./apiClient";

const startedFetchingGoal = () => {
  return {
    type: constants.STARTED_FETCHING_GOAL,
    fetching: true
  };
};

export const finishedFetchingGoal = (
  currentAmount,
  nextGoalAmount,
  nextGoalName
) => {
  return {
    type: constants.FINISHED_FETCHING_GOAL_STATE,
    currentAmount: currentAmount,
    nextGoalAmount: nextGoalAmount,
    nextGoalName: nextGoalName
  };
};

const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
  };
};

export const fetchCurrentGoalState = apiToken => {
  return dispatch => {
    dispatch(startedFetchingGoal);

    return Promise.all([
      fetchCurrentAmount(apiToken),
      fetchCurrentGoal(apiToken),
      fetchCurrentGoalText(apiToken)
    ])
      .then(values => {
        return dispatch(finishedFetchingGoal(values[0], values[1], values[2]));
      })
      .catch(reason => {
        return dispatch(receivedApiError(reason));
      });
  };
};
