import { h, Component } from "preact";
import CountUp from "countup.js";
import ProgressBar from "progressbar.js";

import styles from "./KudoCounter.scss";

class KudoCounter extends Component {
  componentWillReceiveProps({ currentAmount, nextAmount }) {
    let options = {
      useEasing: true,
      useGrouping: false
    };
    let countUp = new CountUp(
      "currentAmount",
      0,
      currentAmount,
      0,
      1.5,
      options
    );

    let percentage = currentAmount / nextAmount;
    let bar = new ProgressBar.Circle("#container", {
      easing: "easeInOut",
      duration: 1500,
      strokeWidth: 6,
      color: "#6692a6",
      trailColor: "#eee",
      trailWidth: 6
    });
    bar.animate(percentage);
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
        <div class={styles.progressBar} id="container" />
      </div>
    );
  }
}

export default KudoCounter;
