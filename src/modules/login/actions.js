import * as constants from "./constants";
import { requestAccessToken} from "./apiClient";

export const startedFetchingAccessToken = () => {
  return {
    type: constants.STARTED_FETCHING_ACCESS_TOKEN
  }
}

export const finishedFetchingAccessToken = (accessToken) => {
  return {
    type: constants.ACCESS_TOKEN_SUCCESS,
    accessToken: accessToken[0].access_token
  }
}

export const receivedAuthenticationError = error => {
  return {
    type: constants.ACCESS_TOKEN_FAILURE,
    error: error
  }
}

export const incorrectParameters = message => {
  return {
    type: constants.INCORRECT_PARAMETERS,
    message: message
  }
}

export const saveErrorMessage = message => {
  return dispatch => {
    dispatch(incorrectParameters(message));
  }
}

export const fetchAccessToken = (username, password) => {
  return dispatch => {
    dispatch(startedFetchingAccessToken);
    return Promise.all([requestAccessToken(username, password)])
    .then(values => {
      return dispatch(finishedFetchingAccessToken(values));
    })
    .catch(error => {
      return dispatch(receivedAuthenticationError(error));
    })
  }
}
