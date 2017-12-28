import { h } from "preact";
import styles from "./StatisticsTable.scss";

export const StatisticsTable = ({ stats }) => {
  return (
    <div class={styles.userStatisticsContainer}>
      <div class={styles.sendTransactions}>
        <span class={styles.statisticsTitle}>{stats.left.label}</span>
        <span class={styles.statisticsValue}>{stats.left.value}</span>
      </div>
      <div class={styles.receivedTransactions}>
        <span class={styles.statisticsTitle}>{stats.middle.label}</span>
        <span class={styles.statisticsValue}>{stats.middle.value}</span>
      </div>
      <div class={styles.totalTransactions}>
        <span class={styles.statisticsTitle}>{stats.right.label}</span>
        <span class={styles.statisticsValue}>{stats.right.value}</span>
      </div>
    </div>
  );
};
