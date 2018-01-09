import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import { LineGraph } from "../components/LineGraph";
import { StatisticsTable } from "../components/StatisticsTable";

import {
  fetchAllGeneralStats,
  fetchAllGraphStats
} from "src/modules/statistics/actions";

import styles from "./StatisticsPage.scss";
import I18n from "src/config/i18n";

export class StatisticsPage extends Component {
  componentWillMount() {
    this.props.fetchAllGeneralStats(this.props.user.apiToken);
    this.props.fetchAllGraphStats(this.props.user.apiToken);
  }

  render({ generalStats, graphStats }) {
    return (
      <Page id="statisticsPage">
        <Header>
          <h1>{I18n.t("statistics.title")}</h1>
        </Header>
        <main>
          <LineGraph stats={graphStats} />
          <h3>{I18n.t("statistics.transactions")}</h3>
          <StatisticsTable stats={generalStats.transactions} />
          <h3 class={styles.kudoHeader}>{I18n.t("statistics.kudos")}</h3>
          <StatisticsTable stats={generalStats.kudos} />
        </main>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  generalStats: state.statistics.generalStats,
  graphStats: state.statistics.graphStats
});

const mapDispatchToProps = {
  fetchAllGeneralStats,
  fetchAllGraphStats
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);
