import Settings from "src/config/settings";
import axios from "axios";

const httpClient = axios.create({
  baseURL: Settings.authorizationLocation
});

const httpClientFCM = axios.create({
  baseURL: Settings.apiLocation
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

export const postFCMToken = (FcmToken, apiToken) => {
  const body = {
    fcmToken: FcmToken
  };

  const headers = {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "Bearer " + apiToken
  };

  return new Promise(resolve => {
    const request = httpClientFCM.post("/fcm", body, {
      headers
    });

    request.then(response => {
      resolve(response);
    });
  });
};
