import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.authorizationLocation
});

export const requestAccessToken = (username, password) => {

  const headers = {
    "Content-Type": "application/json"
  };

  const body = {
    username: username,
    password: password,
    client_id: Settings.client_id,
    client_credential: Settings.client_secret,
    grant_type: "password"
  };

  return new Promise(resolve => {
    const request = httpClient.post("/oauth/token", body, { headers });

    request.then(response => {
      console.log(response);
      resolve(response.data.data);
    });
  });
};
