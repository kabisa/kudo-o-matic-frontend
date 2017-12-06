import * as constants from "./constants";
import moment from "moment";

const initialState = {
  fetching: false,
  transactions: [],
  offset: 0,
  fullImage: undefined,
  error: undefined
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case constants.STARTED_FETCHING_TRANSACTIONS:
      return { ...state, fetching: true };
    case constants.FINISHED_FETCHING_TRANSACTIONS: {
      const transactions = action.transactions.map(transaction => {
        return {
          ...transaction,
          interval: moment(transaction["created-at"]).fromNow()
        };
      });

      return {
        ...state,
        fetching: false,
        transactions: state.transactions.concat(transactions),
        offset: state.offset + 10
      };
    }
    case constants.LIKED_TRANSACTION: {
      const _transactions = state.transactions.map(
        transaction =>
          transaction.id !== action.transactionId
            ? transaction
            : {
                ...transaction,
                "api-user-voted": true,
                "votes-count": transaction["votes-count"] + 1
              }
      );
      return {
        ...state,
        transactions: _transactions
      };
    }
    case constants.UNLIKED_TRANSACTION: {
      const trans = state.transactions.map(
        transaction =>
          transaction.id !== action.transactionId
            ? transaction
            : {
                ...transaction,
                "api-user-voted": false,
                "votes-count": transaction["votes-count"] - 1
              }
      );
      return {
        ...state,
        transactions: trans
      };
    }
    case constants.SHOW_FULL_IMAGE:
      return { ...state, fullImage: action.imageURL };
    case constants.HIDE_FULL_IMAGE:
      return { ...state, fullImage: undefined };
    case constants.RECEIVED_API_ERROR:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
};
