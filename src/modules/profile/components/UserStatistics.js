import { h } from "preact";
import I18n from "src/config/i18n";
import styles from "./UserStatistics.scss";

export const UserStatistics = ({ given, received }) => {
  return (
    <div class={styles.userStatisticsContainer}>
      <div class={styles.sendTransactions}>
        <span class={styles.statisticsTitle}>{I18n.t("profile.given")}</span>
        <span class={styles.statisticsValue}>{given}</span>
      </div>
      <div class={styles.receivedTransactions}>
        <span class={styles.statisticsTitle}>{I18n.t("profile.received")}</span>
        <span class={styles.statisticsValue}>{received}</span>
      </div>
      <div class={styles.totalTransactions}>
        <span class={styles.statisticsTitle}>{I18n.t("profile.total")}</span>
        <span class={styles.statisticsValue}>{given + received}</span>
      </div>
    </div>
  );
};
