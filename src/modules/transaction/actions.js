import * as constants from "./constants";
import { postTransaction, fetchUsers } from "./apiClient";

export const makeFormVisible = () => {
  return { type: constants.MAKE_FORM_VISIBLE };
};

export const makeFormInvisible = () => {
  return { type: constants.MAKE_FORM_INVISIBLE };
};

export const startedAddingTransaction = () => {
  return { type: constants.STARTED_ADDING_TRANSACTION };
};

export const finishedAddingTransaction = transaction => {
  return {
    type: constants.FINISHED_ADDING_TRANSACTION,
    transaction: transaction
  };
};

export const startedFetchingUsers = () => {
  return { type: constants.STARTED_FETCHING_USERS };
};

export const finishedFetchingUsers = users => {
  return { type: constants.FINISHED_FETCHING_USERS, users: users };
};

export const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
  };
};

export const fetchAllUsers = apiToken => {
  return dispatch => {
    dispatch(startedFetchingUsers);

    return fetchUsers(apiToken)
      .then(users => dispatch(finishedFetchingUsers(users)))
      .catch(error => dispatch(receivedApiError(error)));
  };
};

export const addTransaction = (
  amount,
  activity,
  senderId,
  receiverId,
  balanceId,
  apiToken
) => {
  return dispatch => {
    dispatch(startedAddingTransaction());

    return postTransaction(
      amount,
      activity,
      senderId,
      receiverId,
      balanceId,
      apiToken
    )
      .then(transaction => dispatch(finishedAddingTransaction(transaction)))
      .catch(error => {
        return dispatch(receivedApiError(error));
      });
  };
};
