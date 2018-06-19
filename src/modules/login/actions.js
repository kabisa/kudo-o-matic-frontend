import * as constants from "./constants";
import { requestAccessToken, postFCMToken } from "./apiClient";

export const startedFetchingAccessToken = () => {
  return {
    type: constants.STARTED_FETCHING_ACCESS_TOKEN
  }
}

export const finishedFetchingAccessToken = (accessToken, username) => {
  return {
    type: constants.ACCESS_TOKEN_SUCCESS,
    accessToken: accessToken[0].access_token,
    username: username
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
        return dispatch(finishedFetchingAccessToken(values, username));
      })
      .catch(error => {
        return dispatch(receivedAuthenticationError(error));
      })
  }
}

export const fetchFcmToken = () => {
  return dispatch => {
    window.FirebasePlugin.getToken(
      function (FcmToken) {
        dispatch(storeFCMToken(FcmToken, ApiToken["api-token"]));
      },
      function (error) {
        dispatch(errorFCMToken(error));
      }
    );
  }
}

export const storeFCMToken = (FcmToken, ApiToken) => {
  return dispatch => {
    return postFCMToken(FcmToken, ApiToken).then(token => {
      return dispatch(storedFCMToken(token));
    });
  };
};
