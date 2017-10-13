import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import Transaction from "../components/Transaction";
import I18n from "src/config/i18n";
import styles from "./FeedPage.scss";

import { fetchAllTransactions, likeTransaction } from "../actions";

export class FeedPage extends Component {
  componentWillMount() {
    this.props.fetchTransactions(this.props.apiToken);
  }

  render({ transactions, userId, likeTransaction, dislikeTransaction }) {
    return (
      <Page>
        <Header>
          <h1>{I18n.t("feed.title")}</h1>
        </Header>
        <main />
        <ul class={styles.transactionList}>
          {transactions.map(transaction => {
            var liked = false;
            transaction.votes.forEach(vote => {
              if (vote["voter-id"] == userId) {
                liked = true;
              }
            });

            return (
              <li key={transaction.id}>
                <Transaction
                  amount={transaction.amount}
                  from={transaction.sender.name}
                  to={transaction.receiver.name}
                  reason={transaction.activity.name}
                  likes={transaction["likes-amount"]}
                  liked={liked}
                  likeTransaction={likeTransaction}
                  dislikeTransaction={dislikeTransaction}
                />
              </li>
            );
          })}
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

const mapStateToProps = state => ({
  apiToken: state.authentication.user.apiToken,
  userId: state.authentication.user.id,
  transactions: state.feed.transactions
});

const mapDispatchToProps = dispatch => {
  return {
    fetchTransactions: token => dispatch(fetchAllTransactions(token)),
    likeTransaction: (token, senderId, transactionId) =>
      dispatch(likeTransaction({ token, senderId, transactionId }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
