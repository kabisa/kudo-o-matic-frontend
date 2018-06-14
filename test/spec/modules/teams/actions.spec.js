import * as actions from "src/modules/teams/actions";
import * as constants from "src/modules/teams/constants";

describe("Teams actions", () => {
    it("finished fetching all teams", () => {
        const teams = {
            data: {
                teams: [{
                    id: 1,
                    name: "NAME"
                }, {
                    id: 2,
                    name: "NAME"
                }],
                invites: [{
                    id: 3,
                    name: "NAME"
                }]
            }
        }
        const expectedAction = {
            type: constants.FINISHED_FETCHING_TEAMS,
            teams: teams.data
        };

        expect(actions.finishedFetchingTeams(teams)).to.eql(expectedAction);
    });

    it("finished replying to invite", () => {
        const API_TOKEN = "API_TOKEN";

        const expectedAction = {
            type: constants.FINISHED_REPLYING_TO_INVITE
        };

        expect(actions.finishedReplyingToInvite(API_TOKEN)).to.eql(expectedAction);
    });

    it("selected a team", () => {
        const team = {
            id: 1,
            name: "NAME"
        }

        const expectedAction = {
            type: constants.SELECTED_TEAM,
            team: team
        };

        expect(actions.selectedTeam(team)).to.eql(expectedAction);
    });
});