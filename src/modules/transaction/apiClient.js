import Settings from "src/config/settings";
import axios from "axios";
import { Deserializer } from "jsonapi-serializer";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

let headers = {};

export const fetchUsers = apiToken => {
  headers = {
    "api-token": apiToken
  };

  return new Promise(resolve => {
    const request = httpClient.get("/users?fields[users]=name", {
      headers
    });

    request.then(response => {
      const TransactionDeserialize = new Deserializer();
      TransactionDeserialize.deserialize(response.data).then(u => resolve(u));
    });
  });
};

export const postTransaction = (
  amount,
  activity,
  senderId,
  receiverId,
  balanceId,
  apiToken
) => {
  headers = {
    "Content-Type": "application/vnd.api+json",
    "Api-Token": apiToken
  };
  return new Promise(resolve => {
    const body = {
      data: {
        type: "transactions",
        attributes: {
          amount: amount,
          activity: activity
        },
        relationships: {
          receiver: {
            data: {
              type: "users",
              id: receiverId
            }
          }
        }
      }
    };

    const request = httpClient.post(
      "/transactions?include=sender,receiver",
      body,
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
