import { h } from "preact";
import I18n from "src/config/i18n";
import styles from "./UserStatistics.scss";

export const UserStatistics = ({ sent, received, total }) => {
  return (
    <div class={styles.userStatisticsContainer}>
      <div class={styles.leftStats}>
        <span class={styles.statisticsTitle}>{I18n.t("profile.send")}</span>
        <span class={styles.statisticsValue}>{sent}</span>
      </div>
      <div class={styles.leftStats}>
        <span class={styles.statisticsTitle}>{I18n.t("profile.received")}</span>
        <span class={styles.statisticsValue}>{received}</span>
      </div>
      <div class={styles.rightStats}>
        <span class={styles.statisticsTitle}>{I18n.t("profile.total")}</span>
        <span class={styles.statisticsValue}>{total}</span>
      </div>
    </div>
  );
};
