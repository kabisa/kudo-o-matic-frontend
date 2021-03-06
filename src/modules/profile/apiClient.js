import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

let headers = {};

export const fetchUserstats = (apiToken, teamId) => {
  headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };

  return new Promise(resolve => {
    const request = httpClient.get("/users/me/statistics", {
      headers
    });

    request.then(response => {
      resolve(response.data.data);
    });
  });
};

export const fetchUser = (apiToken, teamId) => {
  headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };

  return new Promise(resolve => {
    const request = httpClient.get("/users/me", {
      headers
    });

    request.then(response => {
      resolve(response.data);
    });
  });
}
