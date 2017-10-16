import { goal } from "src/modules/goal/reducer";
import * as constants from "src/modules/goal/constants";

describe("Goal reducer", () => {
  it("returns the initial state", () => {
    expect(goal(undefined, {})).to.eql({
      fetching: false,
      error: undefined,
      currentBalance: {
        name: undefined,
        current: undefined,
        amount: undefined,
        "created-at": undefined,
        "updated-at": undefined
      },
      nextGoal: {
        name: undefined,
        amount: 0,
        "achieved-on": undefined,
        "created-at": undefined,
        "updated-at": undefined
      }
    });
  });

  describe("fetch Current State", () => {
    it("handles STARTED_FETCHING_GOAL", () => {
      expect(goal([], { type: constants.STARTED_FETCHING_GOAL })).to.eql({
        fetching: true
      });
    });

    it("handles FINISED_FETCHING_GOAL_STATE", () => {
      expect(
        goal([], {
          type: constants.FINISHED_FETCHING_GOAL_STATE,
          currentBalance: 100,
          nextGoal: 200
        })
      ).to.eql({
        fetching: false,
        nextGoal: 200,
        currentBalance: 100
      });
    });

    it("handles RECEIVED_API_ERROR", () => {
      expect(
        goal([], {
          type: constants.RECEIVED_API_ERROR,
          error: "API_ERROR"
        })
      ).to.eql({
        error: "API_ERROR"
      });
    });
  });
});
