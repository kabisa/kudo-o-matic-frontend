import { authentication } from "src/modules/login/reducer";
import * as constants from "src/modules/login/constants";

describe("Authentication reducer", () => {
  it("returns the initial state", () => {
    expect(authentication(undefined, {})).to.eql({
      user: {
        apiToken: undefined,
        name: undefined,
        imageUri: undefined
      },
      googleToken: undefined,
      googleError: undefined,
      apiError: undefined
    });
  });

  describe("API_TOKEN", () => {
    it("handles API_TOKEN_SUCCESS", () => {
      expect(
        authentication([], {
          type: constants.API_TOKEN_SUCCESS,
          token: { "api-token": "API_TOKEN" }
        })
      ).to.eql({ user: { apiToken: "API_TOKEN" } });
    });

    it("handles API_TOKEN_FAILURE", () => {
      expect(
        authentication([], {
          type: constants.API_TOKEN_FAILURE,
          error: "API_ERROR"
        })
      ).to.eql({
        apiError: "API_ERROR"
      });
    });
  });

  describe("GOOGLE_TOKEN", () => {
    it("handles GOOGLE_TOKEN_SUCCESS", () => {
      expect(
        authentication([], {
          type: constants.GOOGLE_TOKEN_SUCCESS,
          googleToken: {
            token: "TOKEN",
            profileObj: { name: "JOHN", imageUrl: "http://kabisa.nl/image.jpg" }
          }
        })
      ).to.eql({
        googleToken: {
          token: "TOKEN",
          profileObj: { name: "JOHN", imageUrl: "http://kabisa.nl/image.jpg" }
        },
        user: { name: "JOHN", imageUri: "http://kabisa.nl/image.jpg" }
      });
    });

    it("handles GOOGLE_TOKEN_FAILURE", () => {
      expect(
        authentication([], {
          type: constants.GOOGLE_TOKEN_FAILURE,
          error: "GOOGLE_ERROR"
        })
      ).to.eql({
        googleError: "GOOGLE_ERROR"
      });
    });
  });
});