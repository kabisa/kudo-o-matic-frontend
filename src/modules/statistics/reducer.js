import * as constants from "./constants";

const initialState = {
  fetching: false,
  error: null,
  generalStats: {
    transactions: {
      week: null,
      month: null,
      total: null
    },
    kudos: {
      week: null,
      month: null,
      total: null
    }
  },
  graphStats: {
    0: {
      month: null,
      transactions: null,
      kudos: null
    },
    1: {
      month: null,
      transactions: null,
      kudos: null
    },
    2: {
      month: null,
      transactions: null,
      kudos: null
    },
    3: {
      month: null,
      transactions: null,
      kudos: null
    },
    4: {
      month: null,
      transactions: null,
      kudos: null
    }
  }
};

export const statistics = (state = initialState, action) => {
  switch (action.type) {
    case constants.STARTED_FETCHING_GENERAL_STATS:
      return { ...state, fetching: true };
    case constants.FINISHED_FETCHING_GENERAL_STATS:
      return {
        ...state,
        generalStats: action.generalStats,
        fetching: false
      };
    case constants.STARTED_FETCHING_GRAPH_STATS:
      return { ...state, fetching: true };
    case constants.FINISHED_FETCHING_GRAPH_STATS:
      return {
        ...state,
        graphStats: action.graphStats,
        fetching: false
      };
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
