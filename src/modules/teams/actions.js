import * as constants from "./constants";
import { fetchTeams, replyInvite } from "src/modules/teams/apiClient";
import { route } from "preact-router";

export const finishedFetchingTeams = teams => {
    if(teams.data.amountOfTeams == 1) {
        selectTeam(teams.data.teams[0].id);
        route("/", true);        
    }
    return {
        type: constants.FINISHED_FETCHING_TEAMS,
        teams: teams
    }
}

export const finishedReplyingToInvite = (apiToken) => {
    fetchAllTeams(apiToken);
    return {
        type: constants.FINISHED_REPLYING_TO_INVITE
    }
}

export const receivedApiError = error => {
    return {
        type: constants.RECEIVED_API_ERROR
    }
}

export const selectedTeam = teamId => {
    return {
        type: constants.SELECTED_TEAM,
        teamId: teamId
    }
}

export const selectTeam = teamId => { 
    return dispatch => {        
        dispatch(selectedTeam(teamId));
    } 
}

export const fetchAllTeams = apiToken => {
    return dispatch => {
        return fetchTeams(apiToken)
            .then(teams => dispatch(finishedFetchingTeams(teams)))
            .catch(error => dispatch(receivedApiError(error)));
    }
}

export const replyToInvite = (apiToken, inviteId, acceptedInvite) => {
    return dispatch => {
        return replyInvite(apiToken, inviteId, acceptedInvite)
            .then(dispatch(finishedReplyingToInvite(apiToken)))
            .catch(error => dispatch(receivedApiError(error)));
    }
}