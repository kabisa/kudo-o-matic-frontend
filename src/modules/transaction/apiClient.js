import Settings from "src/config/settings";
import axios from "axios";
import { uriEncode } from "src/support/uriUtils";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

let headers = {};

export const postTransaction = (
  amount,
  activity,
  senderId,
  receiverId,
  balanceId,
  apiToken
) => {
  headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  addActivity(activity).then(activityId => {
    const body = uriEncode({
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
    });

    return new Promise(resolve => {
      const request = httpClient.post("/", body, {
        headers
      });

      request.then(response => {
        resolve(response.data.data);
      });
    });
  });
};

const addActivity = activity => {
  const body = uriEncode({
    type: "activities",
    attributes: {
      name: activity
    }
  });

  return new Promise(resolve => {
    const request = httpClient.post("/activities", body, {
      headers
    });

    request.then(response => {
      resolve(response.data.data.id);
    });
  });
};
