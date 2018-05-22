import * as constants from "./constants";
import { fetchTeams } from "src/modules/teams/apiClient";

export const finishedFetchingTeams = teams => {
    return constants.FINISHED_FETCHING_TEAMS;
}

export const receivedApiError = error => {
    return constants.RECEIVED_API_ERROR;
}

export const fetchTeams = apiToken => {
    return dispatch => {
        return fetchTeams(apiToken)
            .then(teams => dispatch(finishedFetchingTeams(teams)))
            .catch(error => despatch(receivedApiError(error)));
    }
}