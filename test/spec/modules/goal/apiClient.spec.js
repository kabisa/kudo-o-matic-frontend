import {
  fetchCurrentBalance,
  fetchNextGoal
} from "src/modules/goal/apiClient.js";
import sinon from "sinon";
import Settings from "src/config/settings";

describe("Goal api client", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  const okResponse = (body = {}) =>
    new Response(JSON.stringify(body), { status: 200 });

  describe("fetchCurrentBalance", () => {
    const apiToken = "API_TOKEN";

    it("performs Get-Request on goal-endpoint", () => {
      window.fetch.returns(Promise.resolve(okResponse()));

      fetchCurrentBalance(apiToken);

      expect(
        window.fetch
      ).to.have.been.calledWith(
        `${Settings.apiLocation}/api/v1/balances/current`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Token": apiToken
          }
        }
      );
    });
  });

  describe("fetchNext Goal", () => {
    const apiToken = "API_TOKEN";

    it("performs Get-Request on goal-endpoint", () => {
      window.fetch.returns(Promise.resolve(okResponse()));

      fetchNextGoal(apiToken);

      expect(
        window.fetch
      ).to.have.been.calledWith(`${Settings.apiLocation}/api/v1/goals/next`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Api-Token": apiToken
        }
      });
    });
  });
});
