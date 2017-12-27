import Settings from "src/config/settings";
import { create } from "apisauce";
import { Deserializer } from "jsonapi-serializer";

const api = create({
  baseURL: Settings.apiLocation,
  headers: { Accept: "application/vnd.api+json" }
});

export const fetchTransactions = (apiToken, offset) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise(resolve => {
    const request = api.get(
      "transactions?page[limit]=10&page[offset]=" +
        offset +
        "&include=sender,receiver&sort=-created_at",
      {},
      {
        headers
      }
    );

    request.then(response => {
      const TransactionDeserialize = new Deserializer();
      TransactionDeserialize.deserialize(response.data).then(t => resolve(t));
    });
  });
};

export const voteTransaction = (apiToken, transactionId) => {
  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Api-Token": apiToken
    }
  };

  return new Promise(resolve => {
    const request = api.put(
      "transactions/" + transactionId + "/like",
      {},
      headers
    );

    request.then(resolve(transactionId));
  });
};

export const unVoteTransaction = (apiToken, transactionId) => {
  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Api-Token": apiToken
    }
  };

  return new Promise(resolve => {
    const request = api.delete(
      "transactions/" + transactionId + "/like",
      {},
      headers
    );

    request.then(resolve(transactionId));
  });
};
