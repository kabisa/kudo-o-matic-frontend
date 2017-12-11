import * as constants from "./constants";

export const handleLogoutUser = () => {
  return {
    type: constants.LOGOUT_USER
  };
};
