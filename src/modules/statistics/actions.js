import * as constants from "./constants";
import { fetchGeneralStats, fetchGraphStats } from "./apiClient";

export const startedFetchingGeneralStats = () => {
  return {
    type: constants.STARTED_FETCHING_GENERAL_STATS
  };
};

export const finishedFetchingGeneralStats = stats => {
  return {
    type: constants.FINISHED_FETCHING_GENERAL_STATS,
    generalStats: stats
  };
};

export const startedFetchingGraphStats = () => {
  return {
    type: constants.STARTED_FETCHING_GRAPH_STATS
  };
};

export const finishedFetchingGraphStats = stats => {
  return {
    type: constants.FINISHED_FETCHING_GRAPH_STATS,
    graphStats: stats
  };
};

export const fetchAllGraphStats = (apiToken, teamId) => {
  return dispatch => {
    dispatch(startedFetchingGraphStats);

    return fetchGraphStats(apiToken, teamId)
      .then(stats => dispatch(finishedFetchingGraphStats(stats)))
      .catch(error => dispatch(receivedApiError(error)));
  };
};

export const fetchAllGeneralStats = (apiToken, teamId) => {
  return dispatch => {
    dispatch(startedFetchingGeneralStats);

    return fetchGeneralStats(apiToken, teamId)
      .then(stats => dispatch(finishedFetchingGeneralStats(stats)))
      .catch(error => dispatch(receivedApiError(error)));
  };
};

export const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
  };
};
