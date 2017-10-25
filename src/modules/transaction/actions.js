import * as constants from "./constants";
import { postTransaction } from "./apiClient";

export const makeFormVisible = () => {
  return { type: constants.MAKE_FORM_VISIBLE };
};

export const makeFormInvisible = () => {
  return { type: constants.MAKE_FORM_INVISIBLE };
};

export const startedAddingTransaction = () => {
  return { type: constants.STARTED_ADDING_TRANSACTION };
};

export const finishedAddingTransaction = () => {
  return { type: constants.FINISHED_ADDING_TRANSACTION };
};

export const receivedApiError = error => {
  return {
    type: constants.RECEIVED_API_ERROR,
    error: error
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
    ).then(dispatch(finishedAddingTransaction()));
  };
};
