import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

export const fetchCurrentBalance = (apiToken, teamId) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };

  return new Promise(resolve => {
    const request = httpClient.get("/balances/current", {
      headers
    });

    request.then(response => {
      resolve(response.data.data.attributes);
    })
    .catch(error => {
      resolve(error);
    });
  });
};

export const fetchNextGoal = (apiToken, teamId) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken,
    "Team": teamId
  };

  return new Promise(resolve => {
    const request = httpClient.get("/goals/next", {
      headers
    });

    request.then(response => {
      resolve(response.data.data.attributes);
    })
    .catch(error => {
      resolve(error);
    })
  });
};
