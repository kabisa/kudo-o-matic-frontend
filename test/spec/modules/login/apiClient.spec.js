import { requestToken } from "src/modules/login/apiClient.js";
import sinon from "sinon";
import Settings from "src/config/settings";

describe("Authentication api client", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  const okResponse = (body = { data: { "api-token": "API_TOKEN" } }) =>
    new Response(JSON.stringify(body), { status: 200 });

  describe("requestLogin", () => {
    const GoogleToken = {
      tokenObj: { id_token: "VALID_ID" },
      profileObj: {
        googleId: "VALID_ID",
        name: "VALID_NAME",
        email: "VALID_EMAIL",
        imageUrl: "VALID_IMAGE"
      }
    };

    it("performs token-request on auth-endpoint", () => {
      window.fetch.returns(Promise.resolve(okResponse()));

      requestToken(GoogleToken);

      expect(
        window.fetch
      ).to.have.been.calledWith(
        `${Settings.apiLocation}/api/v1/authentication/obtain_api_token`,
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `jwt_token=VALID_ID&uid=VALID_ID&provider=${Settings.provider}&name=VALID_NAME&email=VALID_EMAIL&avatar_url=VALID_IMAGE`
        }
      );
    });

    it("forwards json content of ok responses", () => {
      window.fetch.returns(Promise.resolve(okResponse()));

      return expect(requestToken(GoogleToken)).to.eventually.eql(
        okResponse().json()
      );
    });
  });
});
