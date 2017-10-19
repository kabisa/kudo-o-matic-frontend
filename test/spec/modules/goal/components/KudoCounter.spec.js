import { h } from "preact";
import KudoCounter from "src/modules/goal/components/KudoCounter";
import styles from "src/modules/goal/components/KudoCounter.scss";
import { shallow } from "preact-render-spy";

describe("KudoCounter", function() {
  let currentAmount, nextAmount, nextText;

  beforeEach(function() {
    currentAmount = 100;
    nextAmount = 2000;
    nextText = "Next Goal";
  });

  it("displays the right current balance", function() {
    const context = shallow(
      <KudoCounter
        currentAmount={currentAmount}
        nextAmount={nextAmount}
        nextText={nextText}
      />
    );
    expect(context.contains(<span id="currentAmount">100</span>)).to.be.true;
  });

  it("displays the right next-goal amount", function() {
    const context = shallow(
      <KudoCounter
        currentAmount={currentAmount}
        nextAmount={nextAmount}
        nextText={nextText}
      />
    );
    expect(
      context.contains(
        <div class={styles.nextGoal}>
          of 2000 <span class={styles.kudoCurrency}>₭</span> for
        </div>
      )
    ).to.be.true;
  });

  it("displays the right next-goal name", function() {
    const context = shallow(
      <KudoCounter
        currentAmount={currentAmount}
        nextAmount={nextAmount}
        nextText={nextText}
      />
    );
    expect(context.contains(<div class={styles.nextGoal}>Next Goal</div>)).to.be
      .true;
  });
});
