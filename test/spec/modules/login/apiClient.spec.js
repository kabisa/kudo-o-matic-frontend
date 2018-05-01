import sinon from "sinon";
import Settings from "src/config/settings";
import {requestAccessToken} from "src/modules/login/apiClient"

describe("Authentication API client", () => {
    const USERNAME = "USERNAME";
    const PASSWORD = "PASSWORD";

    beforeEach(() => {
        this.sandbox = sinon.sandbox.create();
        this.sandbox.useFakeServer();
    });

    afterEach(() => {
        this.sandbox.restore();
    });

    describe("requestAccessToken", () => {
        const okResponse = {
            access_token: "ACCESS_TOKEN",
            created_at: 1525167043,
            token_type: "bearer"
        };

        it("request an access token", done => {
            requestAccessToken(USERNAME, PASSWORD);

            new Promise(resolve => setTimeout(resolve)).then(() => {
                const { method, url, requestHeaders } = this.sandbox.server.requests[0];
                expect(method).to.eql("POST");
                expect(url).to.eql(`${Settings.authorizationLocation}/oauth/token`);
                done();
            });
        });

        it("forwards json content of ok responses", done => {
            requestAccessToken(USERNAME, PASSWORD).then(response => {
              expect(response).to.eql(okResponse);
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
