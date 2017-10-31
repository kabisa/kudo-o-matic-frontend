import { h, render } from "preact";
import { FeedPage } from "src/modules/feed/containers/FeedPage";
import Transaction from "src/modules/feed/components/Transaction";

describe("FeedPage", function() {
  let scratch, mount, transactions, user, fetchTransactions;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
    transactions = [
      {
        id: 1,
        amount: 100,
        activity: "transaction1",
        sender: { name: "Robin" },
        receiver: { name: "Luuk" }
      },
      {
        id: 2,
        amount: 200,
        activity: "transaction1",
        sender: { name: "Luuk" },
        receiver: { name: "Robin" }
      }
    ];
    fetchTransactions = () => {};
    user = { apiToken: "API_TOKEN", id: 5 };
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("shows Transaction1 from List", function() {
    const page = mount(
      <FeedPage
        transactions={transactions}
        user={user}
        fetchAllTransactions={fetchTransactions}
      />
    );
    expect(page.outerHTML).to.contain(
      mount(<Transaction transaction={transactions[0]} />).outerHTML
    );
  });

  it("shows Transaction2 from List", function() {
    const page = mount(
      <FeedPage
        transactions={transactions}
        user={user}
        fetchAllTransactions={fetchTransactions}
      />
    );
    expect(page.outerHTML).to.contain(
      mount(<Transaction transaction={transactions[1]} />).outerHTML
    );
  });
});
