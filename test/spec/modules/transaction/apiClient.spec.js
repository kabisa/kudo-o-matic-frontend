import sinon from "sinon";
import { fetchCurrentBalance } from "src/modules/goal/apiClient";
import Settings from "src/config/settings";

describe("Transaction API client", () => {
  const API_TOKEN = "API_TOKEN";

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeServer();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("post new activity", () => {
    it("performs Post-Request on activity-endpoint", done => {
      fetchCurrentBalance(API_TOKEN);

      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("GET");
        expect(url).to.eql(`${Settings.apiLocation}/balances/current`);
        expect(requestHeaders["Api-Token"]).to.contain(API_TOKEN);
        done();
      });
    });
  });
});
