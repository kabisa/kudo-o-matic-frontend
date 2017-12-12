import Settings from "src/config/settings";
import axios from "axios";
import { uriEncode } from "src/support/uriUtils";

const httpClient = axios.create({
  baseURL: Settings.apiLocation
});

export const requestToken = googleToken => {
  const body = uriEncode({
    jwt_token: googleToken.tokenObj.id_token,
    uid: googleToken.profileObj.googleId,
    provider: Settings.provider,
    name: googleToken.profileObj.name,
    email: googleToken.profileObj.email,
    avatar_url: googleToken.profileObj.imageUrl
  });
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  return new Promise(resolve => {
    const request = httpClient.post("/authentication/obtain_api_token", body, {
      headers
    });

    request.then(response => {
      resolve(response.data.data);
    });
  });
};

export const postFCMToken = FCMToken => {
  const body = uriEncode({
    fcm_token: FCMToken
  });
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  return new Promise(resolve => {
    const request = httpClient.post("/authentication/store_fcm_token", body, {
      headers
    });

    request.then(response => {
      resolve(response.data.data["fcm-token"]);
    });
  });
};
