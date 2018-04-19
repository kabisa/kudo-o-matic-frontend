import * as constants from "./constants";
import { LOGOUT_USER } from "../profile/constants";
import Settings from "src/config/settings";
import { saveLogin, loadLogin, removeLogin } from "../../localStorage";

const initialState = {
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
      };
      saveLogin(newState);
      return newState;
    case constants.ACCESS_TOKEN_FAILURE:
      console.log(action.error);
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
};
