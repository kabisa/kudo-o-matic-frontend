import Settings from "src/config/settings";
import axios from "axios";
import { Deserializer } from "jsonapi-serializer";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

let headers = {};

export const fetchUsers = (apiToken, teamId) => {
  headers = {
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };

  return new Promise(resolve => {
    const request = httpClient.get("/users?fields[users]=name,avatar-url", {
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
  receiverName,
  imageData,
  fileType,
  apiToken,
  teamId
) => {
  headers = {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };
  return new Promise(resolve => {
    let attributes = {};

    imageData !== ""
      ? (attributes = {
          amount: amount,
          activity: activity,
          image: imageData,
          "image-file-type": fileType
        })
      : (attributes = {
          amount: amount,
          activity: activity
        });

    const body = {
      data: {
        type: "transactions",
        attributes: attributes,
        relationships: {
          receiver: {
            data: {
              type: "users",
              name: receiverName
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
