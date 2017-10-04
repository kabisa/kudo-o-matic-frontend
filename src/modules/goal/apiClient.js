import Settings from "src/config/settings";

const buildUri = path => {
  return Settings.apiLocation + path;
};

export const fetchCurrentBalance = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise((resolve, reject) => {
    const request = fetch(buildUri("/api/v1/balances/current"), {
      method: "GET",
      mode: "cors",
      headers
    });

    request.then(response => {
      response.json().then(json => {
        if (response.ok) {
          resolve(json.data.attributes);
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

export const fetchNextGoal = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise((resolve, reject) => {
    const request = fetch(buildUri("/api/v1/goals/next"), {
      method: "GET",
      mode: "cors",
      headers
    });

    request.then(response => {
      response.json().then(json => {
        if (response.ok) {
          resolve(json.data.attributes);
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
