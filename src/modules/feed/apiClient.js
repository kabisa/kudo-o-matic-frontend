import Settings from "src/config/settings";
import { create } from "apisauce";

const api = create({
  baseURL: Settings.apiLocation,
  headers: { Accept: "application/vnd.api+json" }
});

export const fetchTransactions = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise(resolve => {
    const request = api.get(
      "transactions?include=activity,sender,receiver,votes&sort=-created_at",
      {},
      {
        headers
      }
    );

    request.then(response => {
      var JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;
      var TransactionDeserialize = new JSONAPIDeserializer();
      TransactionDeserialize.deserialize(response.data).then(t => resolve(t));
    });
  });
};

export const voteTransaction = (apiToken, userId, transactionId) => {
  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Api-Token": apiToken
    }
  };

  return new Promise(resolve => {
    const request = api.put(
      "transactions/" + transactionId + "/votes/" + userId,
      {},
      headers
    );

    request.then(resolve(transactionId));
  });
};

export const unVoteTransaction = (apiToken, userId, transactionId) => {
  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Api-Token": apiToken
    }
  };

  return new Promise(resolve => {
    const request = api.delete(
      "transactions/" + transactionId + "/votes/" + userId,
      {},
      headers
    );

    request.then(resolve(transactionId));
  });
};
