import { transaction } from "src/modules/transaction/reducer";
import * as constants from "src/modules/transaction/constants";

describe("Transaction reducer", () => {
  it("returns the initial state", () => {
    expect(transaction(undefined, {})).to.eql({
      addingTransaction: false,
      formVisible: false,
      fetchingUsers: false,
      users: [],
      filteredUsers: [],
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

  describe("handle fetching users", () => {
    it("handles STARTED_FETCHING_USERS", () => {
      expect(
        transaction([], { type: constants.STARTED_FETCHING_USERS })
      ).to.eql({
        fetchingUsers: true
      });
    });
    it("handles FINISHED_FETCHING_USERS", () => {
      expect(
        transaction([], {
          type: constants.FINISHED_FETCHING_USERS,
          users: [{ name: "user1", id: 1 }, { name: "user2", id: 2 }]
        })
      ).to.eql({
        fetchingUsers: false,
        users: [{ name: "user1", id: 1 }, { name: "user2", id: 2 }]
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
  it("handles FILTERED_USERS", () => {
    expect(
      transaction([], {
        type: constants.FILTERED_USERS,
        filteredUsers: [{ name: "user1", id: 1 }, { name: "user2", id: 2 }]
      })
    ).to.eql({
      filteredUsers: [{ name: "user1", id: 1 }, { name: "user2", id: 2 }]
    });
  });
});
