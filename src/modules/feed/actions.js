import * as constants from "./constants";
import {
  fetchTransactions,
  voteTransaction,
  unVoteTransaction
} from "./apiClient";

export const startedFetchingTransactions = () => {
  return {
    type: constants.STARTED_FETCHING_TRANSACTIONS,
    fetching: true
  };
};

export const finishedFetchingTransaction = (transactions, userId) => {
  return {
    type: constants.FINISHED_FETCHING_TRANSACTIONS,
    transactions: transactions,
    userId: userId
  };
};

export const likedTransaction = transactionId => {
  return {
    type: constants.LIKED_TRANSACTION,
    transactionId: transactionId
  };
};

export const unLikedTransaction = transactionId => {
  return {
    type: constants.UNLIKED_TRANSACTION,
    transactionId: transactionId
  };
};

export const likeTransaction = (transactionId, apiToken) => {
  return dispatch => {
    return voteTransaction(transactionId, apiToken).then(transactionId =>
      dispatch(likedTransaction(transactionId))
    );
  };
};

export const unLikeTransaction = (transactionId, apiToken) => {
  return dispatch => {
    return unVoteTransaction(transactionId, apiToken).then(transactionId =>
      dispatch(unLikedTransaction(transactionId))
    );
  };
};

export const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
  };
};

export const fetchAllTransactions = (apiToken, userId) => {
  return dispatch => {
    dispatch(startedFetchingTransactions);

    return fetchTransactions(apiToken)
      .then(transactions =>
        dispatch(finishedFetchingTransaction(transactions, userId))
      )
      .catch(error => dispatch(receivedApiError(error)));
  };
};
