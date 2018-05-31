import * as constants from "./constants";
import { saveTeams } from "../../localStorage";

const initialState = {
    teams: [],
    invites: [],
    teamId: undefined
};

export const teams = (state = initialState, action) => {
    switch (action.type) {
        case constants.FINISHED_FETCHING_TEAMS:
            //Split the invites from the already accepted teams
            return {
                ...state,
                teams: action.teams.data.teams,
                invites: action.teams.data.invites
            };
        case constants.SELECTED_TEAM:
            const newState = {
                ...state,              
                teamId: action.teamId
            };
            saveTeams(newState);
            return newState;
        default:
            return state;
    }
};