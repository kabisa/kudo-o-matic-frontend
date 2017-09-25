import Settings from "src/config/settings";

const uriEncode = obj => {
  return Object.entries(obj)
    .map(
      ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    )
    .join("&");
};

const buildUri = path => {
  return Settings.apiLocation + path;
};

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

  return new Promise((resolve, reject) => {
    const request = fetch(
      buildUri("/api/v1/authentication/retrieve_api_token"),
      {
        method: "POST",
        mode: "cors",
        headers,
        body
      }
    );

    request.then(response => {
      response.json().then(json => {
        if (response.ok) {
          resolve(json);
        } else {
          reject({ code: json.error, description: json.error_description });
        }
      });
    });

    request.catch(response => {
      reject({ code: response.status, description: response.statusText });
    });
  });
};
