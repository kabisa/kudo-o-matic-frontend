import { h, Component } from "preact";
import CountUp from "countup.js";
import ProgressBar from "progressbar.js";

import styles from "./KudoCounter.scss";

import I18n from "src/config/i18n";

let bar;
let container = <div class={styles.progressBar} id="container" />;

class KudoCounter extends Component {
  componentWillReceiveProps({ currentAmount, nextAmount }) {
    document.getElementById("container").innerHTML = "";
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

    bar = new ProgressBar.Circle("#container", {
      easing: "easeInOut",
      duration: 1500,
      strokeWidth: 6,
      color: "#6692a6",
      trailColor: "#eee",
      trailWidth: 6
    });

    let percentage = currentAmount / nextAmount;
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
          {I18n.t("goal.of")} {nextAmount} <span class={styles.kudoCurrency}>₭</span> {I18n.t("goal.for")}
          </div>
          <div class={styles.nextGoal}>{nextText}</div>
        </div>
        {container}
      </div>
    );
  }
}

export default KudoCounter;
