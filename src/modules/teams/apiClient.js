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

  var teams =
    {
      teams:
        [
          {
            name: "Kabisa",
            imgSource: "https://i.vimeocdn.com/portrait/7982488_300x300"
          },
          {
            name: "Philips",
            imgSource: "https://i.vimeocdn.com/portrait/7982488_300x300"
          }
        ],
      invites:
        [
          {
            inviteId: 123,
            name: "Kabis",
            imgSource: "https://i.vimeocdn.com/portrait/7982488_300x300"
          }
        ]
    }
  
  return new Promise(resolve => {
    // const request = httpClient.get("teams/me", {
    //   headers
    // });

    // request.then(response => {
    //   resolve(response.data);
    // });
    resolve(teams);
  });
};

export const replyInvite = (apiToken, inviteId, acceptedInvite) => {
  const body = {
    data: {
      inviteId: inviteId,
      acceptedInvite: acceptedInvite
    }
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer " + apiToken
  };

  return new Promise(resolve => {
    // const request = httpClient.post("INVITES_ENDPOINT", body, {
    //   headers
    // });

    // request.then(response => {
    //   resolve(response.data);
    // });
    resolve(teams);
  });
};