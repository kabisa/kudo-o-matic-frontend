import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

export const fetchTeams = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken
  };

  return new Promise(resolve => {
    const request = httpClient.get("TEAMS_ENDPOINT", {
      headers
    });

    request.then(response => {
      resolve(response.data);
    });
  });
};