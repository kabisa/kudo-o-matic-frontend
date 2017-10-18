import * as actions from "src/modules/feed/actions";
import * as constants from "src/modules/feed/constants";

describe("Feed actions", () => {
  describe("Fetch transactions", () => {
    it("creates an action to handle start of fetching transactions", () => {
      const expectedAction = {
        type: constants.STARTED_FETCHING_TRANSACTIONS,
        fetching: true
      };

      expect(actions.startedFetchingTransactions()).to.eql(expectedAction);
    });

    it("creates an action to handle current transactions", () => {
      const transactions = {};
      const userId = "USER_ID";
      const expectedAction = {
        type: constants.FINISHED_FETCHING_TRANSACTIONS,
        transactions: {},
        userId: userId
      };

      expect(actions.finishedFetchingTransaction(transactions, userId)).to.eql(
        expectedAction
      );
    });
  });

  describe("Like transactions", () => {
    const transactionId = "TRANSACTION_ID";

    it("creates an action to handle transaction liked", () => {
      const expectedAction = {
        type: constants.LIKED_TRANSACTION,
        transactionId: transactionId
      };

      expect(actions.likedTransaction(transactionId)).to.eql(expectedAction);
    });

    it("creates an action to handle transaction unLiked", () => {
      const expectedAction = {
        type: constants.UNLIKED_TRANSACTION,
        transactionId: transactionId
      };

      expect(actions.unLikedTransaction(transactionId)).to.eql(expectedAction);
    });
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

constants.STARTED_FETCHING_TRANSACTIONS;
