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
      "/transactions?include=activity,sender,receiver,votes&sort=-created_at",
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

export const voteTransaction = (transactionId, userId, apiToken) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise(resolve => {
    const request = httpClient.put(
      "/transactions/" + { transactionId } + "/votes/" + { userId },
      {
        headers
      }
    );

    request.then(response => {
      resolve(response.data.data);
    });
  });
};
