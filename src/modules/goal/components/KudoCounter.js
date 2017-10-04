import { h } from "preact";
import styles from "./KudoCounter.scss";

const KudoCounter = ({ currentAmount, nextAmount, nextText }) => {
  return (
    <div class={styles.kudoCounter}>
      <div class={styles.currentAmount}>
        {currentAmount}
        <span class={styles.kudoCurrency}> ₭</span>
      </div>
      <div class={styles.nextGoal}>
        of {nextAmount} <span class={styles.kudoCurrency}>₭</span> for
      </div>
      <div class={styles.nextGoal}>{nextText}</div>
    </div>
  );
};

export default KudoCounter;
