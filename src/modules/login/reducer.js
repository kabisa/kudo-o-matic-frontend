import * as constants from "./constants";

const initialState = {
  user: {
    apiToken: undefined,
    name: undefined,
    imageUri: undefined
  },
  googleToken: undefined,
  googleError: undefined,
  apiError: undefined
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case constants.API_TOKEN_SUCCESS:
      return {
        ...state,
        user: { ...state.user, apiToken: action.token.api_token }
      };
    case constants.API_TOKEN_FAILURE:
      return {
        ...state,
        apiError: action.error
      };
    case constants.GOOGLE_TOKEN_SUCCESS:
      return {
        ...state,
        googleToken: action.googleToken,
        user: {
          name: action.googleToken.profileObj.name,
          imageUri: action.googleToken.profileObj.imageUrl
        }
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
