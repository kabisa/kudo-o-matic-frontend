import { teams } from "src/modules/teams/reducer";
import * as constants from "src/modules/teams/constants";

describe("Teams reducer", () => {

  it("returns the initial state", () => {
    expect(teams(undefined, {})).to.eql({
      teams: [],
      invites: [],
      team: {
        id: undefined,
        name: undefined
      }
    });
  });

  it("handles FINISHED_FETCHING_TEAMS", () => {
    expect(
      teams([], {
        type: constants.FINISHED_FETCHING_TEAMS,
        teams: {
          teams: [],
          invites: [],
          amountOfInvites: 1,
          amountOfTeams: 1
        }
      })
    ).to.eql({
      teams: [],
      invites: [],
      amountOfInvites: 1,
      amountOfTeams: 1
    });
  });

  it("handles SELECTED_TEAM", () => {
    expect(
      teams([], {
        type: constants.SELECTED_TEAM,
        team: "TEAM"
      })
    ).to.eql({
      team: "TEAM"
    });
  });
});