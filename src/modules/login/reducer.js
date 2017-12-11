import * as constants from "./constants";
import { LOGOUT_USER } from "../profile/constants";
import Settings from "src/config/settings";
import { saveLogin } from "../../localStorage";

const initialState = {
  user: {
    apiToken: Settings.testApiToken,
    id: Settings.testUserId,
    name: undefined,
    imageUri: undefined
  },
  googleToken: undefined,
  googleError: undefined,
  apiError: undefined
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case constants.API_TOKEN_SUCCESS: {
      const newState = {
        ...state,
        user: {
          ...state.user,
          apiToken: action.token["api-token"],
          id: action.token["user-id"]
        }
      };
      saveLogin(newState);
      return newState;
    }
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
    case LOGOUT_USER:
      return {
        user: initialState.user
      };
    default:
      return state;
  }
};
