import * as constants from "./constants";
import { requestToken, postFCMToken } from "./apiClient";

export const startedStoringFCMToken = () => {
  return {
    type: constants.STARTED_STORING_FCM_TOKEN
  };
};

export const storedFCMToken = FCMToken => {
  return {
    type: constants.STORED_FCM_TOKEN,
    fcm_token: FCMToken
  };
};

export const errorFCMToken = error => {
  return {
    type: constants.ERROR_FCM_TOKEN,
    error: error
  };
};

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
        ApiToken => {
          dispatch(handleApiLoginSuccess(ApiToken));

          window.FirebasePlugin.getToken(
            function(FcmToken) {
              dispatch(storeFCMToken(FcmToken, ApiToken["api-token"]));
            },
            function(error) {
              dispatch(errorFCMToken(error));
            }
          );
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

export const storeFCMToken = (FcmToken, ApiToken) => {
  return dispatch => {
    dispatch(startedStoringFCMToken());

    return postFCMToken(FcmToken, ApiToken).then(token => {
      console.log("stored token");
      return dispatch(storedFCMToken(token));
    });
  };
};
