import { feed } from "src/modules/feed/reducer";
import * as constants from "src/modules/feed/constants";
import moment from "moment";

describe("Feed reducer", () => {
  it("returns the initial state", () => {
    expect(feed(undefined, {})).to.eql({
      fetching: false,
      transactions: [],
      error: undefined
    });
  });

  describe("Fetch transactions", () => {
    it("handles STARTED_FETCHING_TRANSACTIONS", () => {
      expect(
        feed([], { type: constants.STARTED_FETCHING_TRANSACTIONS })
      ).to.eql({
        fetching: true
      });
    });

    it("handles FINISED_FETCHING_TRANSACTIONS", () => {
      expect(
        feed([], {
          type: constants.FINISHED_FETCHING_TRANSACTIONS,
          transactions: [
            {
              name: "Transaction1",
              amount: 100,
              "created-at": "2017-01-01T12:00:00.000Z",
              votes: [{ "voter-id": 1 }, { "voter-id": 2 }]
            },
            {
              name: "Transaction2",
              amount: 110,
              "created-at": "2017-01-01T12:00:00.000Z",
              votes: [{ "voter-id": 3 }, { "voter-id": 4 }]
            }
          ],
          userId: 3
        })
      ).to.eql({
        fetching: false,
        transactions: [
          {
            name: "Transaction1",
            amount: 100,
            "created-at": "2017-01-01T12:00:00.000Z",
            votes: [{ "voter-id": 1 }, { "voter-id": 2 }],
            voted: false,
            interval: moment("2017-01-01T12:00:00.000Z").fromNow()
          },
          {
            name: "Transaction2",
            amount: 110,
            "created-at": "2017-01-01T12:00:00.000Z",
            votes: [{ "voter-id": 3 }, { "voter-id": 4 }],
            voted: true,
            interval: moment("2017-01-01T12:00:00.000Z").fromNow()
          }
        ]
      });
    });
  });

  const state = {
    transactions: [
      {
        id: 1,
        name: "Transaction1",
        amount: 100,
        votes: [{ "voter-id": 1 }, { "voter-id": 2 }],
        voted: false,
        "likes-amount": 1
      },
      {
        id: 2,
        name: "Transaction2",
        amount: 110,
        votes: [{ "voter-id": 3 }, { "voter-id": 4 }],
        voted: true,
        "likes-amount": 1
      }
    ]
  };

  describe("Like transactions", () => {
    it("handles LIKED_TRANSACTION", () => {
      expect(
        feed(state, {
          type: constants.LIKED_TRANSACTION,
          transactionId: 1
        })
      ).to.eql({
        transactions: [
          {
            id: 1,
            name: "Transaction1",
            amount: 100,
            votes: [{ "voter-id": 1 }, { "voter-id": 2 }],
            voted: true,
            "likes-amount": 2
          },
          {
            id: 2,
            name: "Transaction2",
            amount: 110,
            votes: [{ "voter-id": 3 }, { "voter-id": 4 }],
            voted: true,
            "likes-amount": 1
          }
        ]
      });
    });

    it("handles UNLIKED_TRANSACTION", () => {
      expect(
        feed(state, {
          type: constants.UNLIKED_TRANSACTION,
          transactionId: 2
        })
      ).to.eql({
        transactions: [
          {
            id: 1,
            name: "Transaction1",
            amount: 100,
            votes: [{ "voter-id": 1 }, { "voter-id": 2 }],
            voted: false,
            "likes-amount": 1
          },
          {
            id: 2,
            name: "Transaction2",
            amount: 110,
            votes: [{ "voter-id": 3 }, { "voter-id": 4 }],
            voted: false,
            "likes-amount": 0
          }
        ]
      });
    });
  });

  it("handles RECEIVED_API_ERROR", () => {
    expect(
      feed([], {
        type: constants.RECEIVED_API_ERROR,
        error: "API_ERROR"
      })
    ).to.eql({
      error: "API_ERROR",
      fetching: false
    });
  });
});
