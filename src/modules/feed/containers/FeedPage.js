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
    this.props.fetchTransactions(this.props.user.apiToken, this.props.user.id);
  }

  render({ transactions, user, like, unLike }) {
    const likeTransaction = transactionId => {
      like(user.apiToken, user.id, transactionId);
    };

    const unLikeTransaction = transactionId => {
      unLike(user.apiToken, user.id, transactionId);
    };

    return (
      <Page id="feedPage">
        <Header>
          <h1>{I18n.t("feed.title")}</h1>
        </Header>
        <main />
        <ul class={styles.transactionList} id="transactionList">
          {transactions.map(transaction => {
            let likeAction;
            transaction.voted
              ? (likeAction = unLikeTransaction)
              : (likeAction = likeTransaction);

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

const mapDispatchToProps = dispatch => {
  return {
    fetchTransactions: (token, userId) =>
      dispatch(fetchAllTransactions(token, userId)),
    like: (apiToken, senderId, transactionId) => {
      dispatch(likeTransaction(apiToken, senderId, transactionId));
    },
    unLike: (apiToken, senderId, transactionId) => {
      dispatch(unLikeTransaction(apiToken, senderId, transactionId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
