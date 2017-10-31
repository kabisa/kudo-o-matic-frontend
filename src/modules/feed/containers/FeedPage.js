import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import Transaction from "../components/Transaction";
import I18n from "src/config/i18n";
import styles from "./FeedPage.scss";

import {
  fetchAllTransactions,
  likeTransaction,
  unLikeTransaction
} from "../actions";

export class FeedPage extends Component {
  componentWillMount() {
    this.props.fetchAllTransactions(this.props.user.apiToken);
  }

  render({ transactions, user, likeTransaction, unLikeTransaction }) {
    const voteTransaction = transactionId => {
      likeTransaction(user.apiToken, transactionId);
    };

    const unVoteTransaction = transactionId => {
      unLikeTransaction(user.apiToken, transactionId);
    };

    return (
      <Page>
        <Header>
          <h1>{I18n.t("feed.title")}</h1>
        </Header>
        <main />
        <ul class={styles.transactionList} id="transactionList">
          {transactions.map(transaction => {
            let likeAction = transaction["api-user-voted"]
              ? (likeAction = unVoteTransaction)
              : (likeAction = voteTransaction);

            return (
              <li key={transaction.id}>
                <Transaction
                  transaction={transaction}
                  likeAction={likeAction}
                />
              </li>
            );
          })}
        </ul>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  transactions: state.feed.transactions
});

const mapDispatchToProps = {
  fetchAllTransactions,
  likeTransaction,
  unLikeTransaction
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
