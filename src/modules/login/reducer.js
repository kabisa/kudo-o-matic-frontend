import * as constants from "./constants";

const initialState = {
  googleToken: undefined,
  apiToken: undefined,
  googleError: undefined,
  apiError: undefined
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case constants.API_TOKEN_SUCCESS:
      return {
        ...state,
        apiToken: action.token.api_token
      };
    case constants.API_TOKEN_FAILURE:
      return {
        ...state,
        apiError: action.error
      };
    case constants.GOOGLE_TOKEN_SUCCESS:
      return {
        ...state,
        googleToken: action.googleToken
      };
    case constants.GOOGLE_TOKEN_FAILURE:
      return {
        ...state,
        googleError: action.error
      };
    default:
      return state;
  }
};
