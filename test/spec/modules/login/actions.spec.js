import * as actions from "src/modules/login/actions";
import * as constants from "src/modules/login/constants";

describe("Authentication actions", () => {
  describe("API_TOKEN", () => {
    it("creates an action to handle api login", () => {
      const token = "API_TOKEN";
      const expectedAction = {
        type: constants.API_TOKEN_SUCCESS,
        token: token
      };

      expect(actions.handleApiLoginSuccess(token)).to.eql(expectedAction);
    });

    it("creates an action to handle api failure", () => {
      const error = "API_ERROR";
      const expectedAction = {
        type: constants.API_TOKEN_FAILURE,
        error: error
      };

      expect(actions.handleApiLoginFailure(error)).to.eql(expectedAction);
    });
  });

  describe("GOOGLE_TOKEN", () => {
    it("creates an action to handle google login", () => {
      const token = "Google_Token";
      const expectedAction = {
        type: constants.GOOGLE_TOKEN_SUCCESS,
        googleToken: token
      };

      expect(actions.handleGoogleLoginSuccess(token)).to.eql(expectedAction);
    });

    it("creates an action to handle google login failure", () => {
      const error = "Google_Error";
      const expectedAction = {
        type: constants.GOOGLE_TOKEN_FAILURE,
        error: error
      };

      expect(actions.handleGoogleLoginFailure(error)).to.eql(expectedAction);
    });
  });
});
