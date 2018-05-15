import { h } from "preact";
import I18n from "src/config/i18n";
import styles from "./LineGraph.scss";

import { Line } from "preact-chartjs-2";
const graphSettings = {
  label: I18n.t("statistics.number_of_transactions"),
  fill: false,
  lineTension: 0.1,
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderColor: "#9b9b9b",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10
};

export const LineGraph = ({ stats }) => {
  const graphData = {
    labels: [
      stats[4].month,
      stats[3].month,
      stats[2].month,
      stats[1].month,
      stats[0].month
    ],
    datasets: [
      {
        ...graphSettings,
        backgroundColor: "#6692a6",
        borderColor: "#007da9",
        pointBorderColor: "#007da9",
        pointHoverBackgroundColor: "#007da9",
        data: [
          stats[4].transactions,
          stats[3].transactions,
          stats[2].transactions,
          stats[1].transactions,
          stats[0].transactions
        ]
      },
      {
        ...graphSettings,
        label: I18n.t("statistics.number_of_kudos"),
        backgroundColor: "#77d0a1",
        borderColor: "#62b688",
        pointBorderColor: "#77d0a1",
        pointHoverBackgroundColor: "#77d0a1",

        data: [
          stats[4].kudos,
          stats[3].kudos,
          stats[2].kudos,
          stats[1].kudos,
          stats[0].kudos
        ]
      }
    ]
  };
  return (
    <div class={styles.graphContainer}>
        <Line data={graphData} />
    </div>
  );
};
