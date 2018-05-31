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
    client_id: process.env.CLIENT_ID,
    client_credential: process.env.CLIENT_SECRET,
    grant_type: "password"
  };
  
  return new Promise((resolve, reject) => {
    const request = httpClient.post("/oauth/token", body, { headers });

    request.then(response => {
      resolve(response.data);
    }).catch(ex => {
      reject(ex);
    });
  });
};
