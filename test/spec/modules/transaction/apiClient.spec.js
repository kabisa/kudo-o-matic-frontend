import sinon from "sinon";
import { postTransaction, fetchUsers } from "src/modules/transaction/apiClient";
import Settings from "src/config/settings";

describe("Transaction API client", () => {
  const API_TOKEN = "API_TOKEN";
  const AMOUNT = 1;
  const USER_ID = 1;
  const RECEIVER_ID = 2;
  const BALANCE = 1;
  const ACTIVITY = "activity";

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeServer();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("fetchUsers", () => {
    it("performs GET-Request on users-endpoint", done => {
      fetchUsers(API_TOKEN);
      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("GET");
        expect(url).to.eql(
          `${Settings.apiLocation}/users?fields[users]=name,avatar-url`
        );
        expect(requestHeaders["api-token"]).to.contain(API_TOKEN);
        done();
      });
    });
  });

  describe("post new transaction", () => {
    it("performs Post-Request on activity-endpoint", done => {
      postTransaction(
        AMOUNT,
        ACTIVITY,
        USER_ID,
        RECEIVER_ID,
        BALANCE,
        API_TOKEN
      );

      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("POST");
        expect(url).to.eql(
          `${Settings.apiLocation}/transactions?include=sender,receiver`
        );
        expect(requestHeaders["Api-Token"]).to.contain(API_TOKEN);
        done();
      });
    });
  });
});
