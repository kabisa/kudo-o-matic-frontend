import * as constants from "./constants";

const initialState = {
};

export const teams = (state = initialState, action) => {
    switch (action.type) {
        case constants.FINISHED_FETCHING_TEAMS:
            console.log(action);
            //Split the invites from the already accepted teams
            return {
                ...state,
                teams: action.teams.teams,
                invites: action.teams.invites
            };

        default:
            return state;
    }
};