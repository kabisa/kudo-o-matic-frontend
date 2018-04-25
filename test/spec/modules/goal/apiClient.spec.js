import sinon from "sinon";
import { fetchCurrentBalance, fetchNextGoal } from "src/modules/goal/apiClient";
import Settings from "src/config/settings";

describe("Goal API client", () => {
  const API_TOKEN = "API_TOKEN";

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeServer();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("fetchCurrentBalance", () => {
    const okResponse = {
      data: {
        id: "1",
        type: "balances",
        links: {
          self: "http://localhost:3000/api/v2/balances/1"
        },
        attributes: {
          name: "Balance 1",
          current: true,
          amount: 1000,
          "created-at": "2017-10-02T10:40:51.727Z",
          "updated-at": "2017-10-04T08:15:26.769Z"
        },
        relationships: {
          transactions: {
            links: {
              self:
                "http://localhost:3000/api/v2/balances/1/relationships/transactions",
              related: "http://localhost:3000/api/v2/balances/1/transactions"
            }
          }
        }
      }
    };

    it("performs GET-Request on goal-endpoint", done => {
      fetchCurrentBalance(API_TOKEN);

      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("GET");
        expect(url).to.eql(`${Settings.apiLocation}/balances/current`);
        expect(requestHeaders["Authorization"]).to.contain("Bearer " + API_TOKEN);
        done();
      });
    });

    it("forwards json content of ok responses", done => {
      fetchCurrentBalance(API_TOKEN).then(response => {
        expect(response).to.eql(okResponse.data.attributes);
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

  describe("fetchNextGoal", () => {
    const okResponse = {
      data: {
        id: "2",
        type: "goals",
        links: {
          self: "http://localhost:3000/api/v2/goals/2"
        },
        attributes: {
          name: "Goal 2",
          amount: 1500,
          "achieved-on": null,
          "created-at": "2017-10-02T10:40:51.745Z",
          "updated-at": "2017-10-02T10:40:51.745Z"
        },
        relationships: {
          balance: {
            links: {
              self:
                "http://localhost:3000/api/v2/goals/2/relationships/balance",
              related: "http://localhost:3000/api/v2/goals/2/balance"
            }
          }
        }
      }
    };

    it("performs GET-Request on goal-endpoint", done => {
      fetchNextGoal(API_TOKEN);

      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("GET");
        expect(url).to.eql(`${Settings.apiLocation}/goals/next`);
        expect(requestHeaders["Authorization"]).to.contain("Bearer " + API_TOKEN);
        done();
      });
    });

    it("forwards json content of ok responses", done => {
      fetchCurrentBalance(API_TOKEN).then(response => {
        expect(response).to.eql(okResponse.data.attributes);
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
