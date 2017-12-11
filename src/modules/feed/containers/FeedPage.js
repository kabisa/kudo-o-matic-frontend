import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import Transaction from "../components/Transaction";
import ImageView from "../components/ImageView";
import I18n from "src/config/i18n";
import styles from "./FeedPage.scss";

import {
  fetchAllTransactions,
  likeTransaction,
  unLikeTransaction,
  hideFullImage,
  showFullImage
} from "../actions";

export class FeedPage extends Component {
  componentWillMount() {
    this.props.fetchAllTransactions(this.props.user.apiToken);
  }

  render({
    transactions,
    user,
    fullImage,
    showFullImage,
    hideFullImage,
    likeTransaction,
    unLikeTransaction
  }) {
    const voteTransaction = transactionId => {
      likeTransaction(user.apiToken, transactionId);
    };

    const unVoteTransaction = transactionId => {
      unLikeTransaction(user.apiToken, transactionId);
    };

    return (
      <Page>
        {fullImage !== undefined ? (
          <ImageView
            class={styles.imageView}
            imageURL={fullImage}
            closeImage={hideFullImage}
          />
        ) : null}
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
                  showFullImage={showFullImage}
                  image={transaction["image-url-thumb"]}
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
  transactions: state.feed.transactions,
  fullImage: state.feed.fullImage
});

const mapDispatchToProps = {
  fetchAllTransactions,
  likeTransaction,
  unLikeTransaction,
  showFullImage,
  hideFullImage
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
