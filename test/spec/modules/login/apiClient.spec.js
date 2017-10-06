import sinon from "sinon";

describe("Authentication api client", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe("requestLogin", () => {
    it("performs token-request on auth-endpoint", () => {});

    it("forwards json content of ok responses", () => {});
  });
});
