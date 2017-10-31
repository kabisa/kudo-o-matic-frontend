import * as actions from "src/modules/transaction/actions";
import * as constants from "src/modules/transaction/constants";

describe("Transaction actions", () => {
  it("creates an action to start adding a transaction", () => {
    const expectedAction = {
      type: constants.STARTED_ADDING_TRANSACTION
    };

    expect(actions.startedAddingTransaction()).to.eql(expectedAction);
  });

  it("creates an action to finish adding a transaction", () => {
    const expectedAction = {
      type: constants.FINISHED_ADDING_TRANSACTION,
      transaction: undefined
    };

    expect(actions.finishedAddingTransaction()).to.eql(expectedAction);
  });

  it("creates an action to make the transaction form visible", () => {
    const expectedAction = {
      type: constants.MAKE_FORM_VISIBLE
    };

    expect(actions.makeFormVisible()).to.eql(expectedAction);
  });

  it("creates an action to make the transaction form invisible", () => {
    const expectedAction = {
      type: constants.MAKE_FORM_INVISIBLE
    };

    expect(actions.makeFormInvisible()).to.eql(expectedAction);
  });

  it("creates an action to handle api error", () => {
    const apiError = "API_ERROR";
    const expectedAction = {
      type: constants.RECEIVED_API_ERROR,
      error: apiError
    };

    expect(actions.receivedApiError(apiError)).to.eql(expectedAction);
  });
});
