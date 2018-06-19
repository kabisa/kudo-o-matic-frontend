import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

let headers = {};

export const fetchGeneralStats = (apiToken, teamId) => {
  headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };

  return new Promise(resolve => {
    const request = httpClient.get("/statistics/general", {
      headers
    });

    request.then(response => {
      resolve(response.data.data);
    });
  });
};

export const fetchGraphStats = (apiToken, teamId) => {
  headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };

  return new Promise(resolve => {
    const request = httpClient.get("/statistics/graph", {
      headers
    });

    request.then(response => {
      resolve(response.data.data);
    });
  });
}
