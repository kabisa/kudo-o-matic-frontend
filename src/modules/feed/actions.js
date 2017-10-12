import * as constants from "./constants";
import { fetchTransactions } from "./apiClient";

export const startedFetchingTransactions = () => {
  return {
    type: constants.STARTED_FETCHING_TRANSACTIONS,
    fetching: true
  };
};

export const finishedFetchingTransaction = transactions => {
  return {
    type: constants.FINISHED_FETCHING_TRANSACTIONS,
    transactions: transactions
  };
};

export const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
  };
};

export const fetchAllTransactions = apiToken => {
  return dispatch => {
    dispatch(startedFetchingTransactions);

    return fetchTransactions(apiToken)
      .then(transactions => dispatch(finishedFetchingTransaction(transactions)))
      .catch(error => dispatch(receivedApiError(error)));
  };
};
