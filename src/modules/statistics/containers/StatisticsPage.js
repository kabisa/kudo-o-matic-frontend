import { h, Component } from "preact";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import I18n from "src/config/i18n";

export class StatisticsPage extends Component {
  render() {
    return (
      <Page id="statisticsPage">
        <Header>
          <h1>{I18n.t("statistics.title")}</h1>
        </Header>
        <main />
      </Page>
    );
  }
}

export default StatisticsPage;
