import * as constants from "./constants";
import { saveTeams } from "../../localStorage";

const initialState = {
    teams: [],
    invites: [],
    team: {
        id: undefined,
        name: undefined
    }
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
                team: action.team
            };
            saveTeams(newState);
            return newState;
        case constants.CHANGE_TEAM:
            return {
                ...state,
                team: {
                    id: undefined,
                    name: undefined
                }
            }
        default:
            return state;
    }
};