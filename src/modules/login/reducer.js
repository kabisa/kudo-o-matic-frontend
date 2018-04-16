import * as constants from "./constants";
import { LOGOUT_USER } from "../profile/constants";
import Settings from "src/config/settings";
import { saveLogin } from "../../localStorage";

const initialState = {
  user: {
    apiToken: Settings.testApiToken,
    id: Settings.testUserId,
    name: undefined
  },
  apiError: undefined
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case constants.ACCESS_TOKEN_SUCCESS:
      const newState = {
        ...state,
        user: {
          ...state.user,
          apiToken: action.accessToken
        }
      }
    default:
      return state;
  }
};
