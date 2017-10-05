import sinon from "sinon";

describe("Goal api client", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe("fetchCurrentBalance", () => {
    it("performs Get-Request on goal-endpoint", () => {});

    describe("fetchNext Goal", () => {
      it("performs Get-Request on goal-endpoint", () => {});
    });
  });
});
