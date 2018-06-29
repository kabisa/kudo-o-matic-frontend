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
            return {
                ...state,
                teams: action.teams.teams,
                invites: action.teams.invites,
                amountOfInvites: action.teams.amountOfInvites,
                amountOfTeams: action.teams.amountOfTeams
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