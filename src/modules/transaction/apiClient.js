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
      var TransactionDeserialize = new Deserializer();
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
    addActivity(activity).then(activityId => {
      const body = {
        data: {
          type: "transactions",
          attributes: {
            amount: amount
          },
          relationships: {
            activity: {
              data: {
                type: "activities",
                id: activityId
              }
            },
            sender: {
              data: {
                type: "users",
                id: senderId
              }
            },
            receiver: {
              data: {
                type: "users",
                id: receiverId
              }
            },
            balance: {
              data: {
                type: "balances",
                id: balanceId
              }
            }
          }
        }
      };

      const request = httpClient.post(
        "/transactions?include=activity,sender,receiver,votes&sort=-created_at",
        body,
        {
          headers
        }
      );

      request.then(response => {
        var TransactionDeserialize = new Deserializer();
        TransactionDeserialize.deserialize(response.data).then(t => resolve(t));
      });
    });
  });
};

const addActivity = activity => {
  const body = {
    data: {
      type: "activities",
      attributes: {
        name: activity
      }
    }
  };

  return new Promise(resolve => {
    const request = httpClient.post("/activities", body, {
      headers
    });

    request.then(response => {
      resolve(response.data.data.id);
    });
  });
};
