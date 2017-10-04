import { h, Component } from "preact";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import I18n from "src/config/i18n";
import Transaction from "../components/Transaction";

export class FeedPage extends Component {
  render() {
    return (
      <Page>
        <Header>
          <h1>{I18n.t("feed.title")}</h1>
        </Header>
        <main />
        <ul>
          <li>
            <Transaction />
          </li>
          <li>
            <Transaction />
          </li>
          <li>
            <Transaction />
          </li>
          <li>
            <Transaction />
          </li>
        </ul>
      </Page>
    );
  }
}

export default FeedPage;
