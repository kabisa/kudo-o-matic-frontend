import { h, Component } from "preact";
import CountUp from 'react-countup';
import ProgressBar from "progressbar.js";

import styles from "./KudoCounter.scss";

import I18n from "src/config/i18n";

import { Doughnut } from "preact-chartjs-2";

class KudoCounter extends Component {
  render({ nextAmount, nextText, currentAmount }) {
    return (
      <div>
        <div class={styles.kudoCounter}>

          <div class={styles.currentAmount}>
            <CountUp start={0} end={currentAmount} duration={1.7} />
            <span class={styles.kudoCurrency}> ₭</span>
          </div>
          <div class={styles.nextGoal}>
            {I18n.t("goal.of")} {nextAmount} <span class={styles.kudoCurrency}>₭</span> {I18n.t("goal.for")}
          </div>
          <div class={styles.nextGoal}>{nextText}</div>
        </div>
        <div className={styles.progressBar}>
          <Doughnut data={{
            datasets: [{
              data: [currentAmount, nextAmount - currentAmount],
              backgroundColor: [
                '#6692a6',
                'lightgrey'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'
              ]
            }]
          }} options={{
            cutoutPercentage: 80
          }} width={1} height={1} />
        </div>
      </div>
    );
  }
}

export default KudoCounter;
