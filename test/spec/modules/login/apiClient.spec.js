import sinon from "sinon";
import Settings from "src/config/settings";
import { requestToken } from "src/modules/login/apiClient";

describe("Authentication API client", () => {
  const googleToken = {
    tokenObj: {
      id_token: "ID_TOKEN"
    },
    profileObj: {
      name: "John",
      email: "john@kabisa.nl",
      googleId: "USER_ID",
      imageUrl: "http://google.com/image.png"
    }
  };

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeServer();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("request API-Token", () => {
    const okResponse = {
      data: {
        "api-token": "KACqF93MIwZF8Eskb4XK2A",
        "user-id": "1"
      }
    };

    it("performs token-request on auth-endpoint", done => {
      requestToken(googleToken);

      return new Promise(resolve => setTimeout(resolve)).then(() => {
        const {
          method,
          url,
          requestBody,
          requestHeaders
        } = this.sandbox.server.requests[0];

        expect(method).to.eql("POST");
        expect(url).to.eql(
          `${Settings.apiLocation}/authentication/obtain_api_token`
        );
        expect(requestHeaders["Content-Type"]).to.contain(
          "application/x-www-form-urlencoded"
        );
        expect(requestBody).to.eql(
          `jwt_token=ID_TOKEN&uid=USER_ID&provider=google_oauth2&name=John&email=john%40kabisa.nl&avatar_url=http%3A%2F%2Fgoogle.com%2Fimage.png`
        );
        done();
      }, 0);
    });

    it("forwards json content of ok responses", done => {
      requestToken(googleToken).then(response => {
        expect(response).to.eql(okResponse.data);
        done();
      });

      setTimeout(() => {
        this.sandbox.server.respond([
          200,
          { "Content-Type": "application/json" },
          JSON.stringify(okResponse)
        ]);
      }, 0);
    });
  });
});
