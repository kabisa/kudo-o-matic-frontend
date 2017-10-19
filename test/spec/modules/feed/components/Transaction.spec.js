import { h } from "preact";
import Transaction from "src/modules/feed/components/Transaction";
import styles from "src/modules/feed/components/Transaction.scss";
import { shallow } from "preact-render-spy";

describe("KudoCounter", function() {
  let transaction;

  beforeEach(function() {
    transaction = {
      id: 1,
      amount: 100,
      activity: { name: "fixing bugs" },
      sender: { name: "Robin" },
      receiver: { name: "Luuk" },
      "likes-amount": 5
    };
  });

  it("displays the right value", function() {
    const context = shallow(<Transaction transaction={transaction} />);
    expect(
      context.contains(
        <div class={styles.value} id="kudoAmount">
          105
        </div>
      )
    ).to.be.true;
  });

  it("displays the right activity text", function() {
    const context = shallow(<Transaction transaction={transaction} />);
    expect(
      context.contains(
        <div class={styles.transactionText}>
          Robin: 100 <span class={styles.kudoCurrency}>₭</span> to Luuk for
          fixing bugs
        </div>
      )
    ).to.be.true;
  });

  it("displays the right like-amount", function() {
    const context = shallow(<Transaction transaction={transaction} />);
    expect(context.contains(<span id="likeAmount">5</span>)).to.be.true;
  });

  it("handles like-button click", function() {
    const likeAction = sinon.spy();
    const context = shallow(
      <Transaction transaction={transaction} likeAction={likeAction} />
    );
    context.find("a").simulate("click");
    expect(likeAction.calledOnce).to.equal(true);
  });
});
