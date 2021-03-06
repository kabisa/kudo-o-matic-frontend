import * as actions from "src/modules/login/actions";
import * as constants from "src/modules/login/constants";

describe("Authentication actions", () => {
  describe("ACCESS_TOKEN", () => {
    it("creates an action to handle api login", () => {
      const token = [{access_token: "ACCESS_TOKEN",
                      excessData: "EXCESS_DATA"}];
      const username = "USERNAME";
      const expectedAction = {
        type: constants.ACCESS_TOKEN_SUCCESS,
        accessToken: token[0].access_token,
        username: username
      };

      expect(actions.finishedFetchingAccessToken(token, username)).to.eql(expectedAction);
    });

    it("creates an action to handle api failure", () => {
      const error = "ACCESS_TOKEN_ERROR";
      const expectedAction = {
        type: constants.ACCESS_TOKEN_FAILURE,
        error: error
      };

      expect(actions.receivedAuthenticationError(error)).to.eql(expectedAction);
    });

    it("not all parameters are given", () => {
      const message = "MISSING_PARAMETERS";
      const expectedAction = {
        type: constants.INCORRECT_PARAMETERS,
        message: message
      };
      expect(actions.incorrectParameters(message)).to.eql(expectedAction);
    });
  });
});
