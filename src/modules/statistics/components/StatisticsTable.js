import { h } from "preact";
import styles from "./StatisticsTable.scss";

export const StatisticsTable = ({ left, middle, right }) => {
  return (
    <div class={styles.userStatisticsContainer}>
      <div class={styles.sendTransactions}>
        <span class={styles.statisticsTitle}>{left.label}</span>
        <span class={styles.statisticsValue}>{left.value}</span>
      </div>
      <div class={styles.receivedTransactions}>
        <span class={styles.statisticsTitle}>{middle.label}</span>
        <span class={styles.statisticsValue}>{middle.value}</span>
      </div>
      <div class={styles.totalTransactions}>
        <span class={styles.statisticsTitle}>{right.label}</span>
        <span class={styles.statisticsValue}>{right.value}</span>
      </div>
    </div>
  );
};
