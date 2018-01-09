import { h } from "preact";
import I18n from "src/config/i18n";
import styles from "./StatisticsTable.scss";

export const StatisticsTable = ({ stats }) => {
  return (
    <div class={styles.userStatisticsContainer}>
      <div class={styles.sendTransactions}>
        <span class={styles.statisticsTitle}>{I18n.t("statistics.week")}</span>
        <span class={styles.statisticsValue}>{stats.week}</span>
      </div>
      <div class={styles.receivedTransactions}>
        <span class={styles.statisticsTitle}>{I18n.t("statistics.month")}</span>
        <span class={styles.statisticsValue}>{stats.month}</span>
      </div>
      <div class={styles.totalTransactions}>
        <span class={styles.statisticsTitle}>{I18n.t("statistics.total")}</span>
        <span class={styles.statisticsValue}>{stats.total}</span>
      </div>
    </div>
  );
};
