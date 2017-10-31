import { transaction } from "src/modules/transaction/reducer";
import * as constants from "src/modules/transaction/constants";

describe("Transaction reducer", () => {
  it("returns the initial state", () => {
    expect(transaction(undefined, {})).to.eql({
      addingTransaction: false,
      formVisible: false,
      fetchingUsers: false,
      users: [],
      error: undefined
    });
  });

  describe("handle new transactions", () => {
    it("handles STARTED_FETCHING_TRANSACTION", () => {
      expect(
        transaction([], { type: constants.STARTED_ADDING_TRANSACTION })
      ).to.eql({
        addingTransaction: true
      });
    });

    it("handles FINISHED_ADDING_TRANSACTION", () => {
      expect(
        transaction(
          {
            addingTransaction: true,
            formVisible: true
          },
          { type: constants.FINISHED_ADDING_TRANSACTION }
        )
      ).to.eql({
        addingTransaction: false,
        formVisible: false
      });
    });
  });

  describe("handle new transactions", () => {
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
  });
});
