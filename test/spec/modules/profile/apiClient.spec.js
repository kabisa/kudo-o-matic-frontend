import sinon from "sinon";
import Settings from "src/config/settings";
import {fetchUserStats, fetchUser} from "src/modules/profile/apiClient"

describe("Authentication API client", () => {
    const ACCESS_TOKEN = "ACCESS_TOKEN";

    beforeEach(() => {
        this.sandbox = sinon.sandbox.create();
        this.sandbox.useFakeServer();
    });

    afterEach(() => {
        this.sandbox.restore();
    });

    describe("fetchUserStats", () => {
        const okResponse = {
            data: {
                received: 10,
                sent: 10,
                total: 20
            }
        };

        it("fetch the userstatistics", done => {
            fetchUserStats(ACCESS_TOKEN);

            new Promise(resolve => setTimeout(resolve)).then(() => {
                const { method, url, requestHeaders } = this.sandbox.server.requests[0];
                expect(method).to.eql("GET");
                expect(url).to.eql(`${Settings.authorizationLocation}/statistics/user`);
                done();
            });
        });

        it("forwards json content of ok responses", done => {
            fetchUserStats(ACCESS_TOKEN).then(response => {
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

    describe("fetchUser", () => {
        const okResponse = {
            avatar_url: "AVATAR_URL",
            name: "NAME"
        };

        it("fetch the userinfo", done => {
            fetchUser(ACCESS_TOKEN);

            new Promise(resolve => setTimeout(resolve)).then(() => {
                const { method, url, requestHeaders } = this.sandbox.server.requests[0];
                expect(method).to.eql("GET");
                expect(url).to.eql(`${Settings.authorizationLocation}/users/me`);
                done();
            });
        });

        it("forwards json content of ok responses", done => {
            fetchUser(ACCESS_TOKEN).then(response => {
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