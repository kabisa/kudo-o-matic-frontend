import * as constants from "./constants";
import { postTransaction, fetchUsers } from "./apiClient";
import { fetchAllTransactions } from "src/modules/feed/actions";

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

export const searchUser = (searchQuery, users) => {
  let filteredUsers = [];
  users.forEach(user => {
    if (searchQuery.length) {
      if (user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) {
        filteredUsers.push({ user });
      }
    }
  });
  return {
    type: "FILTERED_USERS",
    filteredUsers: filteredUsers.slice(0, 4)
  };
};

export const addTransaction = (
  amount,
  activity,
  receiverId,
  imageData,
  fileType,
  apiToken
) => {
  return dispatch => {
    dispatch(startedAddingTransaction());

    return postTransaction(
      amount,
      activity,
      receiverId,
      imageData,
      fileType,
      apiToken
    )
      .then(transaction => {
        dispatch(finishedAddingTransaction(transaction));
        dispatch(fetchAllTransactions(apiToken, 0));
      })
      .catch(error => {
        return dispatch(receivedApiError(error));
      });
  };
};
