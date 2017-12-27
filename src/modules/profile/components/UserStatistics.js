import { h } from "preact";
import styles from "./UserStatistics.scss";

export const UserStatistics = ({ given, received }) => {
  return (
    <div class={styles.userStatisticsContainer}>
      <div class={styles.sendTransactions}>
        <span class={styles.statisticsTitle}>Given</span>
        <span class={styles.statisticsValue}>{given}</span>
      </div>
      <div class={styles.receivedTransactions}>
        <span class={styles.statisticsTitle}>Received</span>
        <span class={styles.statisticsValue}>{received}</span>
      </div>
      <div class={styles.totalTransactions}>
        <span class={styles.statisticsTitle}>Total</span>
        <span class={styles.statisticsValue}>{given + received}</span>
      </div>
    </div>
  );
};
