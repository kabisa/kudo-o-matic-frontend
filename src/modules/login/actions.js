import * as constants from "./constants";
import { requestToken } from "./apiClient";

export const handleGoogleLoginSuccess = token => {
  return {
    type: constants.GOOGLE_TOKEN_SUCCESS,
    googleToken: token
  };
};

export const handleApiLoginSuccess = token => {
  return {
    type: constants.API_TOKEN_SUCCESS,
    token: token
  };
};

export const handleApiLoginFailure = error => {
  return {
    type: constants.API_TOKEN_FAILURE,
    error: error
  };
};

export const handleGoogleLoginFailure = error => {
  return {
    type: constants.GOOGLE_TOKEN_FAILURE,
    error: error
  };
};

export const requestApiToken = googleToken => {
  return dispatch => {
    dispatch(handleGoogleLoginSuccess(googleToken));

    return requestToken(googleToken)
      .then(
        token => {
          return dispatch(handleApiLoginSuccess(token));
        },
        error => {
          return dispatch(handleApiLoginFailure(error));
        }
      )
      .catch(error => {
        return dispatch(handleApiLoginFailure(error));
      });
  };
};
