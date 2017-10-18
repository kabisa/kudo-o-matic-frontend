import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

export const fetchTransactions = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise(resolve => {
    const request = httpClient.get(
      "transactions?include=activity,sender,receiver,votes&sort=-created_at",
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
      "Content-Type": "application/vnd.api+json",
      "Api-Token": apiToken
    }
  };

  const data = {};

  return new Promise(resolve => {
    const request = httpClient.put(
      "transactions/" + transactionId + "/votes/" + userId,
      data,
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

  const data = {};

  return new Promise(resolve => {
    const request = httpClient.delete(
      "transactions/" + transactionId + "/votes/" + userId,
      headers,
      data
    );

    request.then(resolve(transactionId));
  });
};
