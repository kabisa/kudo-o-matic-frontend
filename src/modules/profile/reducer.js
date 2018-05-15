import * as constants from "./constants";

const initialState = {
  fetching: false,
  error: null,
  userstats: {
    sent: null,
    received: null,
    total: null
  },
  user: {
    name: null,
    imageUri: null
  }
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case constants.STARTED_FETCHING_USERSTATS:
      return { ...state, fetching: true };
    case constants.FINISHED_FETCHING_USERSTATS:
      return {
        ...state,
        userstats: action.userstats,
        fetching: false
      };
    case constants.FINISHED_FETCHING_USERINFO:
      console.log(action.userinfo);
      return {
        ...state,
        user: {
          name: action.userinfo.name,
          imageUri: action.userinfo.avatar_url
        }
      }
    case constants.RECEIVED_API_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      };
    default:
      return state;
  }
};
