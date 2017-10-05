import { h, Component } from "preact";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import I18n from "src/config/i18n";
import styles from "./FeedPage.scss";

import Transaction from "../components/Transaction";

export class FeedPage extends Component {
  render() {
    return (
      <Page>
        <Header>
          <h1>{I18n.t("feed.title")}</h1>
        </Header>
        <main />
        <ul class={styles.transactionList}>
          <li>
            <Transaction
              amount={100}
              from="Luuk Hermans"
              to="Robin Laugs"
              reason="Sprint 1 delivery"
              likes={1}
            />
          </li>
          <li>
            <Transaction
              amount={5}
              from="Luuk Hermans"
              to="Robin Laugs"
              reason="arranging API agreements"
              likes={0}
            />
          </li>
        </ul>
      </Page>
    );
  }
}

export default FeedPage;
