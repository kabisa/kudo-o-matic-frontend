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
    const request = httpClient.get("teams/me", {
      headers
    });

    request.then(response => {
      console.log(response);
      resolve(response.data);
    });
  });
};

export const replyInvite = (apiToken, inviteId, acceptedInvite) => {
  const body = {
    data: {
      accept: acceptedInvite
    }
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken
  };

  return new Promise(resolve => {
    const request = httpClient.put("invites/" + inviteId, body, {
      headers
    });

    request.then(response => {
      resolve(response.data);
    });
  });
};