import { h, Component } from "preact";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import { LineGraph } from "../components/LineGraph";
import { StatisticsTable } from "../components/StatisticsTable";
import styles from "./StatisticsPage.scss";
import I18n from "src/config/i18n";

export class StatisticsPage extends Component {
  render() {
    const transactionStats = {
      left: {
        label: "Week",
        value: 0
      },
      middle: {
        label: "Received",
        value: 21
      },
      right: {
        label: "Total",
        value: 24
      }
    };

    const kudoStats = {
      left: {
        label: "Week",
        value: 0
      },
      middle: {
        label: "Received",
        value: 464
      },
      right: {
        label: "Total",
        value: 7449
      }
    };

    const graphStats = [
      { month: "August", trans: 33, kudos: 42 },
      { month: "September", trans: 20, kudos: 63 },
      { month: "October", trans: 10, kudos: 42 },
      { month: "November", trans: 19, kudos: 51 },
      { month: "December", trans: 32, kudos: 103 }
    ];

    return (
      <Page id="statisticsPage">
        <Header>
          <h1>{I18n.t("statistics.title")}</h1>
        </Header>
        <main>
          <LineGraph stats={graphStats} />
          <h3>{I18n.t("statistics.transactions")}</h3>
          <StatisticsTable stats={transactionStats} />
          <h3 class={styles.kudoHeader}>{I18n.t("statistics.kudos")}</h3>
          <StatisticsTable stats={kudoStats} />
        </main>
      </Page>
    );
  }
}

export default StatisticsPage;
