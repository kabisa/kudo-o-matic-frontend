import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

let headers = {};

export const fetchUserstats = apiToken => {
  headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "api-token": apiToken
  };

  return new Promise(resolve => {
    const request = httpClient.get("/statistics/user", {
      headers
    });

    request.then(response => {
      resolve(response.data.data);
    });
  });
};
