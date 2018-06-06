import * as constants from "./constants";
import { removeLogin, removeTeams } from "../../localStorage";
import { fetchUserstats, fetchUser } from "src/modules/profile/apiClient";

export const handleLogoutUser = () => {
  removeLogin();
  removeTeams();
  return {
    type: constants.LOGOUT_USER
  };
};

export const handleChangeTeam = () => {
  removeTeams();
  return {
    type: constants.CHANGE_TEAM
  }
}

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

export const finishedFetchingUserInfo = info => {
  return {
    type: constants.FINISHED_FETCHING_USERINFO,
    userinfo: info
  }
}

export const fetchUserInfo = (apiToken, teamId) => {
  return dispatch => {
    return fetchUser(apiToken, teamId)
      .then(info => dispatch(finishedFetchingUserInfo(info)))
      .catch(error => dispatch(receivedApiError(error)));
  }
}

export const fetchAllUserstats = (apiToken, teamId) => {
  return dispatch => {
    dispatch(startedFetchingUserstats);

    return fetchUserstats(apiToken, teamId)
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
