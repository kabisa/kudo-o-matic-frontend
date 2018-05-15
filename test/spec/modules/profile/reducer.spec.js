import { profile } from "src/modules/profile/reducer";
import * as constants from "src/modules/profile/constants";

describe("Authentication reducer", () => {
  it("returns the initial state", () => {
    expect(profile(null, {})).to.eql({
        fetching: false,
        error: null,
        userstats: {
          sent: null,
          received: null,
          total: null
        },
        user: {
          name: null,
          imageUri: null
        }
    });
  });

  it("handles STARTED_FETCHING_USERSTATS", () => {
    expect(
      profile([], {
        type: constants.STARTED_FETCHING_USERSTATS
      })
    ).to.eql({
      fetching: true
    });
  });

  it("handles FINISHED_FETCHING_USERSTATS", () => {
    expect(
      profile([], {
        type: constants.FINISHED_FETCHING_USERSTATS,
        userstats: "USERSTATS"
      })
    ).to.eql({
      userstats: "USERSTATS",
      fetching: false
    });
  });

  it("handles FINISHED_FETCHING_USERINFO", () => {
    expect(
      profile([], {
        type: constants.FINISHED_FETCHING_USERINFO,
        userinfo: {
            name: "NAME",
            avatar_url: "AVATAR_URL"
        }
      })
    ).to.eql({
      user: {
          name: "NAME",
          imageUri: "AVATAR_URL"
      }
    });
  });

  it("handles RECEIVED_API_ERROR", () => {
    expect(
      profile([], {
        type: constants.RECEIVED_API_ERROR,
        error: "ERROR"
      })
    ).to.eql({
      error: "ERROR",
      fetching: false
    });
  });
});