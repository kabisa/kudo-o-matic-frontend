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
});
