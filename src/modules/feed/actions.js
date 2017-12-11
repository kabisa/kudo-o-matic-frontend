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

export const finishedFetchingTransaction = transactions => {
  return {
    type: constants.FINISHED_FETCHING_TRANSACTIONS,
    transactions: transactions
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

export const showFullImage = imageURL => {
  return {
    type: constants.SHOW_FULL_IMAGE,
    imageURL: imageURL
  };
};

export const hideFullImage = () => {
  return {
    type: constants.HIDE_FULL_IMAGE
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
      .then(transactions => {
        dispatch(finishedFetchingTransaction(transactions));
      })
      .catch(error => dispatch(receivedApiError(error)));
  };
};
