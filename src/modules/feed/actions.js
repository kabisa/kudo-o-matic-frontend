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

export const finishedFetchingTransaction = (transactions, offset) => {
  return {
    type: constants.FINISHED_FETCHING_TRANSACTIONS,
    transactions: transactions,
    offset: offset
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

export const likeTransaction = (apiToken, teamId, transactionId) => {
  return dispatch => {
    return voteTransaction(apiToken, teamId, transactionId).then(transactionId =>
      dispatch(likedTransaction(transactionId))
    );
  };
};

export const unLikeTransaction = (apiToken, teamId, transactionId) => {
  return dispatch => {
    return unVoteTransaction(apiToken, teamId, transactionId).then(transactionId =>
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

export const fetchAllTransactions = (apiToken, teamId, offset) => {
  return dispatch => {
    dispatch(startedFetchingTransactions());

    return fetchTransactions(apiToken, teamId, offset)
      .then(transactions => {
        dispatch(finishedFetchingTransaction(transactions, offset));
      })
      .catch(error => dispatch(receivedApiError(error)));
  };
};
