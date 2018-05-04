import * as constants from "./constants";
import { LOGOUT_USER } from "../profile/constants";
import Settings from "src/config/settings";
import { saveLogin, loadLogin, removeLogin } from "../../localStorage";

const initialState = {
  user: {
    apiToken: Settings.test_access_token
  },
  error: undefined
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case constants.ACCESS_TOKEN_SUCCESS:
      const newState = {
        ...state,
        user: {
          apiToken: action.accessToken
        },
        error: undefined
      };
      saveLogin(newState);
      return newState;
    case constants.ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error.response.data.error
      }
    case constants.INCORRECT_PARAMETERS:
      return {
        ...state,
        error: action.message
      }
    case constants.LOGOUT_USER:
      return {
        ...state,
        user: {
          apiToken: undefined
        }
      }
    default:
      return state;
  }
};
