import sinon from "sinon";
import Settings from "src/config/settings";
import { fetchTeams, replyInvite } from "src/modules/teams/apiClient";

describe("Teams API client", () => {
    const ACCESS_TOKEN = "ACCESS_TOKEN";

    beforeEach(() => {
        this.sandbox = sinon.sandbox.create();
        this.sandbox.useFakeServer();
    });

    afterEach(() => {
        this.sandbox.restore();
    });

    describe("fetchTeams", () => {
        const okResponse = {
            data: {
                amountOfTeams: 3,
                teams: [{
                    id: 1,
                    logo: "LOGO",
                    name: "NAME",
                    slug: "NAME"
                }, {
                    id: 2,
                    logo: "LOGO",
                    name: "NAME",
                    slug: "NAME"
                }],
                invites: [{
                    id: 3,
                    name: "NAME"
                }]
            }
        };

        it("fetch all teams", done => {
            fetchTeams(ACCESS_TOKEN);

            new Promise(resolve => setTimeout(resolve)).then(() => {
                const { method, url, requestHeaders } = this.sandbox.server.requests[0];
                expect(method).to.eql("GET");
                expect(url).to.eql(`${Settings.apiLocation}/teams/me`);
                done();
            });
        });
    });

    describe("replyInvite", () => {
        const inviteId = 1;
        const acceptedInvite = true;
        it("fetch the userinfo", done => {
            replyInvite(ACCESS_TOKEN, inviteId, acceptedInvite);

            new Promise(resolve => setTimeout(resolve)).then(() => {
                const { method, url, requestHeaders } = this.sandbox.server.requests[0];
                expect(method).to.eql("PUT");
                expect(url).to.eql(`${Settings.apiLocation}/invites/${inviteId}`);
                done();
            });
        });        
    });
});