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

  describe("FETCHING_USERSTATS", () => {
    it("creates an action to fetch the userstatistics", () => {
      const expectedAction = {
        type: constants.FINISHED_FETCHING_USERSTATS,
        userstats: "USERSTATS"
      };

      expect(actions.finishedFetchingUserstats("USERSTATS")).to.eql(expectedAction);
    });
  });

  describe("FETCHING_USERINFO", () => {
    it("creates an action to fetch the userinfo", () => {
      const expectedAction = {
        type: constants.FINISHED_FETCHING_USERINFO,
        userinfo: "USERINFO"
      };

      expect(actions.finishedFetchingUserstats("USERINFO")).to.eql(expectedAction);
    });
  });
});
