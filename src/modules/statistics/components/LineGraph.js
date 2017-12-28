import { h } from "preact";
import I18n from "src/config/i18n";
import styles from "./LineGraph.scss";

import { Line } from "preact-chartjs-2";

export const LineGraph = ({ stats }) => {
  const graphData = {
    labels: [
      stats[0].month,
      stats[1].month,
      stats[2].month,
      stats[3].month,
      stats[4].month
    ],
    datasets: [
      {
        label: I18n.t("statistics.number_of_transactions"),
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#6692a6",
        borderColor: "#007da9",
        pointBorderColor: "#007da9",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#007da9",
        pointHoverBorderColor: "#9b9b9b",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          stats[0].trans,
          stats[1].trans,
          stats[2].trans,
          stats[3].trans,
          stats[4].trans
        ]
      },
      {
        label: I18n.t("statistics.number_of_kudos"),
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#77d0a1",
        borderColor: "#62b688",
        pointBorderColor: "#77d0a1",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#77d0a1",
        pointHoverBorderColor: "#9b9b9b",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          stats[0].kudos,
          stats[1].kudos,
          stats[2].kudos,
          stats[3].kudos,
          stats[4].kudos
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
