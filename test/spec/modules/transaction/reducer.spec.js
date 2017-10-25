import { transaction } from "src/modules/transaction/reducer";
import * as constants from "src/modules/transaction/constants";

describe("Transaction reducer", () => {
  it("returns the initial state", () => {
    expect(transaction(undefined, {})).to.eql({
      addingTransaction: false,
      formVisible: false,
      error: undefined
    });
  });

  describe("fetch Current State", () => {
    it("handles STARTED_FETCHING_GOAL", () => {
      expect(
        transaction([], { type: constants.STARTED_ADDING_TRANSACTION })
      ).to.eql({
        addingTransaction: true
      });
    });

    it("handles FINISHED_FETCHING_TRANSACTION", () => {
      expect(
        transaction(
          {
            addingTransaction: true
          },
          { type: constants.STARTED_ADDING_TRANSACTION }
        )
      ).to.eql({
        addingTransaction: false
      });
    });

    it("handles MAKE_FORM_VISIBLE", () => {
      expect(transaction([], { type: constants.MAKE_FORM_VISIBLE })).to.eql({
        formVisible: true
      });
    });

    it("handles MAKE_FORM_INVISIBLE", () => {
      expect(
        transaction(
          { formVisible: true },
          {
            type: constants.MAKE_FORM_INVISIBLE
          }
        )
      ).to.eql({
        formVisible: false
      });
    });

    it("handles RECEIVED_API_ERROR", () => {
      expect(
        transaction([], {
          type: constants.RECEIVED_API_ERROR,
          error: "API_ERROR"
        })
      ).to.eql({
        error: "API_ERROR"
      });
    });
  });
});
