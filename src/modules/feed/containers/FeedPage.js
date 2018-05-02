import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import Transaction from "../components/Transaction";
import LoadingBlock from "../components/LoadingBlock";
import PullToRefresh from "src/components/PullToRefresh";
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
    console.log(this.props);
    this.props.fetchAllTransactions(this.props.user.apiToken, 0);
  }

  render({
    transactions,
    user,
    offset,
    fetching,
    fullImage,
    enabled,
    showFullImage,
    hideFullImage,
    likeTransaction,
    unLikeTransaction,
    fetchAllTransactions
  }) {
    const checkPageScroll = e => {
      if (
        e.target.scrollHeight - e.target.scrollTop <
          e.target.offsetHeight + 250 &&
        !fetching
      ) {
        fetchAllTransactions(this.props.user.apiToken, offset);
      }
    };

    const voteTransaction = transactionId => {
      likeTransaction(user.apiToken, transactionId);
    };

    const unVoteTransaction = transactionId => {
      unLikeTransaction(user.apiToken, transactionId);
    };

    return (
      <Page class={styles.page}>
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
        <PullToRefresh
          onRefresh={() => {
            fetchAllTransactions(this.props.user.apiToken, 0);
          }}
          className={styles.feedContainer}
          onScroll={checkPageScroll}
          id="feedContainer"
          enabled={enabled}
        >
          {transactions.map(transaction => {
            let likeAction = transaction["api-user-voted"]
              ? (likeAction = unVoteTransaction)
              : (likeAction = voteTransaction);

            return (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                likeAction={likeAction}
                showFullImage={showFullImage}
                image={transaction["image-url-thumb"]}
              />
            );
          })}
          <LoadingBlock />
        </PullToRefresh>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  transactions: state.feed.transactions,
  offset: state.feed.offset,
  fetching: state.feed.fetching,
  fullImage: state.feed.fullImage,
  enabled: true
});

const mapDispatchToProps = {
  fetchAllTransactions,
  likeTransaction,
  unLikeTransaction,
  showFullImage,
  hideFullImage
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
