import * as actions from "src/modules/goal/actions";
import * as constants from "src/modules/goal/constants";

describe("Goal actions", () => {
  it("creates an action to start fetching current state", () => {
    const expectedAction = {
      type: constants.STARTED_FETCHING_GOAL,
      fetching: true
    };

    expect(actions.startedFetchingGoal()).to.eql(expectedAction);
  });

  it("creates an action to handle current goal state", () => {
    const currentBalance = 100;
    const nextGoal = 200;
    const expectedAction = {
      type: constants.FINISHED_FETCHING_GOAL_STATE,
      currentBalance: currentBalance,
      nextGoal: nextGoal
    };

    expect(actions.finishedFetchingGoal(currentBalance, nextGoal)).to.eql(
      expectedAction
    );
  });

  it("creates an action to handle api error", () => {
    const apiError = "API_ERROR";
    const expectedAction = {
      type: constants.RECEIVED_API_ERROR,
      error: apiError
    };

    expect(actions.receivedApiError(apiError)).to.eql(expectedAction);
  });
});
