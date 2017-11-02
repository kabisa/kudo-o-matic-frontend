import sinon from "sinon";
import { fetchTransactions } from "src/modules/feed/apiClient";
import Settings from "src/config/settings";

describe("Feed API client", () => {
  const API_TOKEN = "API_TOKEN";

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeServer();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("fetchTransactions", () => {
    it("performs GET-Request on transactions-endpoint", done => {
      fetchTransactions(API_TOKEN);

      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("GET");
        expect(url).to.eql(
          `${Settings.apiLocation}/transactions?include=sender,receiver&sort=-created_at`
        );
        expect(requestHeaders["Api-Token"]).to.contain(API_TOKEN);
        done();
      });
    });
  });
});
