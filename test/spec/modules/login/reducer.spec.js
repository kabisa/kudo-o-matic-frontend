import { authentication } from "src/modules/login/reducer";
import * as constants from "src/modules/login/constants";
import Settings from "src/config/settings";

describe("Authentication reducer", () => {
  it("returns the initial state", () => {
    expect(authentication(undefined, {})).to.eql({
      user: {
        apiToken: Settings.test_access_token
      },
      error: undefined
    });
  });

  it("handles ACCESS_TOKEN_SUCCESS", () => {
    expect(
      authentication([], {
        type: constants.ACCESS_TOKEN_SUCCESS,
        accessToken: "ACCESS_TOKEN",
        username: "USERNAME"
      })
    ).to.eql({
      user: {
        username: "USERNAME",
        apiToken: "ACCESS_TOKEN"
      },
      error: undefined
    });
  });

  it("handles ACCESS_TOKEN_FAILURE", () => {
    expect(
      authentication([], {
        type: constants.ACCESS_TOKEN_FAILURE,
        error: {
          response: {
            data: {
              error: "ERROR"
            }
          }
        }
      })
    ).to.eql({
      error: "ERROR"
    });
  });

  it("handles INCORRECT_PARAMETERS", () => {
    expect(
      authentication([], {
        type: constants.INCORRECT_PARAMETERS,
        message: "MISSING_PARAMETERS"
      })
    ).to.eql({
      error: "MISSING_PARAMETERS"
    });
  });

  it("handles LOGOUT_USER", () => {
    expect(
      authentication([], {
        type: constants.LOGOUT_USER
      })
    ).to.eql({
      user: {
        apiToken: undefined
      }
    });
  });
});
