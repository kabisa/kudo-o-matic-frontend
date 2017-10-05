import { requestApiToken } from "src/modules/login/actions";
import * as constants from "src/modules/login/constants";
import sinon from "sinon";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const googleToken = {
  tokenObj: { id_token: "VALID_ID" },
  profileObj: {
    googleId: "VALID_ID",
    name: "VALID_NAME",
    email: "VALID_EMAIL",
    imageUrl: "VALID_IMAGE"
  }
};

describe("Login async actions", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  const okResponse = (body = { data: { "api-token": "API_TOKEN" } }) =>
    new Response(JSON.stringify(body), { status: 200 });

  it("creates API_TOKEN_SUCCESS when apiToken is fetched successful", () => {
    window.fetch.returns(Promise.resolve(okResponse()));

    const store = mockStore({ authentication: [] });

    return store.dispatch(requestApiToken(googleToken)).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).to.eql(2);
      expect(expectedActions).to.contain({
        type: constants.GOOGLE_TOKEN_SUCCESS,
        googleToken: googleToken
      });
      expect(expectedActions).to.contain({
        type: constants.API_TOKEN_SUCCESS,
        token: { "api-token": "API_TOKEN" }
      });
    });
  });
});
