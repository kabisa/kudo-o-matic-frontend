import * as constants from "./constants";
import { removeLogin } from "../../localStorage";
import { fetchUserstats } from "src/modules/profile/apiClient";

export const handleLogoutUser = () => {
  removeLogin();

  return {
    type: constants.LOGOUT_USER
  };
};

export const startedFetchingUserstats = () => {
  return {
    type: constants.STARTED_FETCHING_USERSTATS
  };
};

export const finishedFetchingUserstats = stats => {
  return {
    type: constants.FINISHED_FETCHING_USERSTATS,
    userstats: stats
  };
};

export const fetchAllUserstats = apiToken => {
  return dispatch => {
    dispatch(startedFetchingUserstats);

    return fetchUserstats(apiToken)
      .then(stats => dispatch(finishedFetchingUserstats(stats)))
      .catch(error => dispatch(receivedApiError(error)));
  };
};

export const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
  };
};
