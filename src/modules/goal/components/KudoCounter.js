import { h, Component } from "preact";
import CountUp from "countup.js";

import styles from "./KudoCounter.scss";

class KudoCounter extends Component {
  componentWillReceiveProps({ currentAmount }) {
    let options = {
      useEasing: true,
      useGrouping: false
    };
    let countUp = new CountUp(
      "currentAmount",
      0,
      currentAmount,
      0,
      2.5,
      options
    );
    countUp.start();
  }

  render({ nextAmount, nextText }) {
    return (
      <div>
        <div class={styles.kudoCounter} id="kudoCounter">
          <div class={styles.currentAmount}>
            <span id="currentAmount" />
            <span class={styles.kudoCurrency}> ₭</span>
          </div>
          <div class={styles.nextGoal}>
            of {nextAmount} <span class={styles.kudoCurrency}>₭</span> for
          </div>
          <div class={styles.nextGoal}>{nextText}</div>
        </div>
      </div>
    );
  }
}

export default KudoCounter;
