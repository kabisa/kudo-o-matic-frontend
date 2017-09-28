import Settings from "src/config/settings";

const buildUri = path => {
  return Settings.apiLocation + path;
};

export const fetchCurrentAmount = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise((resolve, reject) => {
    const request = fetch(buildUri("/api/v1/balances/current_amount"), {
      method: "GET",
      mode: "cors",
      headers
    });

    request.then(response => {
      response.json().then(json => {
        if (response.ok) {
          resolve(json.data.current_amount);
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

export const fetchCurrentGoal = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise((resolve, reject) => {
    const request = fetch(buildUri("/api/v1/goals/next_amount"), {
      method: "GET",
      mode: "cors",
      headers
    });

    request.then(response => {
      response.json().then(json => {
        if (response.ok) {
          resolve(json.data.next_amount);
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

export const fetchCurrentGoalText = apiToken => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Api-Token": apiToken
  };

  return new Promise((resolve, reject) => {
    const request = fetch(buildUri("/api/v1/goals/next_name"), {
      method: "GET",
      mode: "cors",
      headers
    });

    request.then(response => {
      response.json().then(json => {
        if (response.ok) {
          resolve(json.data.next_name);
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
