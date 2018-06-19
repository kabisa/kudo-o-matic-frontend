import { h, Component } from "preact";
import CountUp from 'react-countup';
import ProgressBar from "progressbar.js";

import styles from "./KudoCounter.scss";

import I18n from "src/config/i18n";

let bar;
let container = <div class={styles.progressBar} id="container" />;

class KudoCounter extends Component {
  componentWillReceiveProps({ currentAmount, nextAmount }) {
    document.getElementById("container").innerHTML = "";

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
  }

  render({ nextAmount, nextText, currentAmount }) {
    return (
      <div>
        <div class={styles.kudoCounter} id="kudoCounter">
          <div class={styles.currentAmount}>
            <CountUp start={0} end={currentAmount} duration={1.7}/>
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
