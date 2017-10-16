import { h } from "preact";
import KudoCounter from "src/modules/goal/components/KudoCounter";
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
    expect(context.contains(<p>100 ₭ of 2000 ₭ for Next Goal</p>)).to.be.true;
  });
});
