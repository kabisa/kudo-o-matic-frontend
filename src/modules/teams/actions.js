import * as constants from "./constants";
import { fetchTeams, replyInvite } from "src/modules/teams/apiClient";
import { route } from "preact-router";

export const finishedFetchingTeams = teams => {
    return {
        type: constants.FINISHED_FETCHING_TEAMS,
        teams: teams.data
    }
}

export const finishedReplyingToInvite = (apiToken) => {
    return {
        type: constants.FINISHED_REPLYING_TO_INVITE
    }
}

export const receivedApiError = error => {
    return {
        type: constants.RECEIVED_API_ERROR
    }
}

export const selectedTeam = (team) => {
    return {
        type: constants.SELECTED_TEAM,
        team: team
    }
}

export const selectTeam = (team) => {
    return dispatch => {
        dispatch(selectedTeam(team));
    }
}

export const fetchAllTeams = apiToken => {
    return dispatch => {
        return fetchTeams(apiToken)
            .then(teams => {
                if (teams.data.amountOfTeams == 1 && teams.data.amountOfInvites == 0) {
                    dispatch(selectedTeam(teams.data.teams[0]));
                    route("/", true);
                } else {
                    dispatch(finishedFetchingTeams(teams))
                }
            })
            .catch(error => dispatch(receivedApiError(error)));
    }
}

export const replyToInvite = (apiToken, inviteId, acceptedInvite) => {
    return dispatch => {
        return replyInvite(apiToken, inviteId, acceptedInvite)
            .then(done => {
                dispatch(finishedReplyingToInvite(apiToken));
                dispatch(fetchAllTeams(apiToken));
            })
            .catch(error => dispatch(receivedApiError(error)));
    }
}