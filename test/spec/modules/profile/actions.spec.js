import * as constants from "src/modules/profile/constants";
import * as actions from "src/modules/profile/actions";

describe("Profile actions", () => {
  describe("LOGOUT_USER", () => {
    it("creates an action to logout the user", () => {
      const expectedAction = {
        type: constants.LOGOUT_USER
      };

      expect(actions.handleLogoutUser()).to.eql(expectedAction);
    });
  });
});
