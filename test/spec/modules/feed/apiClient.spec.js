import sinon from "sinon";
import { Deserializer } from "jsonapi-serializer";
import { fetchTransactions } from "src/modules/feed/apiClient";
import Settings from "src/config/settings";

describe("Feed API client", () => {
  const API_TOKEN = "API_TOKEN";
  let OFFSET = 0;

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.sandbox.useFakeServer();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("fetchTransactions", () => {
    const okResponse = {
      data: [
        {
          id: "1",
          type: "transactions",
          links: {
            self: "http://localhost:3000/api/v1/transactions/1"
          },
          attributes: {
            "created-at": "2017-10-06T08:25:21.381Z",
            "updated-at": "2017-10-06T08:25:21.381Z",
            amount: 100,
            activity: "activity",
            "votes-count": 0,
            "api-user-voted": false,
            "image-url-original":
              "http://www.example.com/kudo-o-matic-development/transactions/images/001/original/image.jpg",
            "image-url-thumb":
              "http://www.example.com/kudo-o-matic-development/transactions/images/001/thumb/image.jpg",
            "image-file-name": "image.jpg",
            "image-content-type": "image/jpeg",
            "image-file-size": 100000,
            "image-updated-at": "2017-10-06T08:25:20.842Z"
          },
          relationships: {
            sender: {
              links: {
                self:
                  "http://localhost:3000/api/v1/transactions/1/relationships/sender",
                related: "http://localhost:3000/api/v1/transactions/1/sender"
              }
            },
            receiver: {
              links: {
                self:
                  "http://localhost:3000/api/v1/transactions/1/relationships/receiver",
                related: "http://localhost:3000/api/v1/transactions/1/receiver"
              }
            },
            balance: {
              links: {
                self:
                  "http://localhost:3000/api/v1/transactions/1/relationships/balance",
                related: "http://localhost:3000/api/v1/transactions/1/balance"
              }
            }
          }
        },
        {
          id: "2",
          type: "transactions",
          links: {
            self: "http://localhost:3000/api/v1/transactions/2"
          },
          attributes: {
            "created-at": "2017-10-05T07:34:07.24Z",
            "updated-at": "2017-10-05T07:34:07.24Z",
            amount: 200,
            activity: "activity",
            "votes-count": 0,
            "api-user-voted": false,
            "image-url-original": null,
            "image-url-thumb": null,
            "image-file-name": null,
            "image-content-type": null,
            "image-file-size": null,
            "image-updated-at": null
          },
          relationships: {
            sender: {
              links: {
                self:
                  "http://localhost:3000/api/v1/transactions/2/relationships/sender",
                related: "http://localhost:3000/api/v1/transactions/2/sender"
              }
            },
            receiver: {
              links: {
                self:
                  "http://localhost:3000/api/v1/transactions/2/relationships/receiver",
                related: "http://localhost:3000/api/v1/transactions/2/receiver"
              }
            },
            balance: {
              links: {
                self:
                  "http://localhost:3000/api/v1/transactions/2/relationships/balance",
                related: "http://localhost:3000/api/v1/transactions/2/balance"
              }
            }
          }
        }
      ],
      links: {
        first:
          "http://localhost:3000/api/v1/transactions?page%5Blimit%5D=10&page%5Boffset%5D=0",
        last:
          "http://localhost:3000/api/v1/transactions?page%5Blimit%5D=10&page%5Boffset%5D=0"
      }
    };

    it("performs GET-Request on transactions-endpoint", done => {
      fetchTransactions(API_TOKEN, OFFSET);

      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("GET");
        expect(url).to.eql(
          `${
            Settings.apiLocation
          }/transactions?page[limit]=10&page[offset]=0&include=sender,receiver&sort=-created_at`
        );
        expect(requestHeaders["Api-Token"]).to.contain(API_TOKEN);
        done();
      });
    });

    it("performs GET-Request on other offset", done => {
      OFFSET = 10;
      fetchTransactions(API_TOKEN, OFFSET);

      new Promise(resolve => setTimeout(resolve)).then(() => {
        const { method, url, requestHeaders } = this.sandbox.server.requests[0];
        expect(method).to.eql("GET");
        expect(url).to.eql(
          `${
            Settings.apiLocation
          }/transactions?page[limit]=10&page[offset]=10&include=sender,receiver&sort=-created_at`
        );
        expect(requestHeaders["Api-Token"]).to.contain(API_TOKEN);
        done();
      });
    });

    it("forwards json content of ok responses", done => {
      const TransactionDeserialize = new Deserializer();
      fetchTransactions(API_TOKEN, OFFSET).then(response => {
        TransactionDeserialize.deserialize(okResponse).then(t => {
          expect(response).to.eql(t);
        });
        done();
      });

      setTimeout(() => {
        this.sandbox.server.respond([
          200,
          { "Content-Type": "application/json" },
          JSON.stringify(okResponse)
        ]);
      }, 0);
    });
  });
});
