import { h, Component } from "preact";
import { emojify } from "react-emojione";
import { imageExists } from "src/support/imageUtils";
import { checkForGroup } from "src/support/transactionUtils";

import styles from "./Transaction.scss";
import LoadingAnimation from "src/components/LoadingAnimation";
import LikeIconInactive from "src/assets/icons/transaction/thumbs-up-inactive.svg";
import LikeIconActive from "src/assets/icons/transaction/thumbs-up-active.svg";
import Avatar from "src/assets/avatars/blank_avatar.jpg";

import I18n from "src/config/i18n";

const emojiOptions = {
  style: {
    height: 16
  }
};

export class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true
    };
    if (this.props.transaction.receiver) {
      let receiver = this.props.transaction.receiver;
      let sender = this.props.transaction.sender;
      this.setState({
        avatarReceiver: receiver["avatar-url"],
        avatarSender: sender["avatar-url"]
      });
    }
  }

  showLoadingImage = () => {
    setTimeout(this.loadImage(), 5000);
  };

  loadImage = () => {
    imageExists(this.props.transaction["image-url-thumb"], existsImage => {
      if (existsImage == true) {
        this.setState({ imageLoading: false });
      }
    });
  };

  render({ transaction, likeAction, showFullImage }, { imageLoading }) {
    let thumb;
    let image = null;
    if (transaction["api-user-voted"]) {
      thumb = LikeIconActive;
    } else {
      thumb = LikeIconInactive;
    }

    if (!this.state.avatarReceiver) {
      this.state.avatarReceiver = Avatar;
    }

    if (!this.state.avatarSender) {
      this.state.avatarSender = Avatar;
    }

    transaction = checkForGroup(transaction);

    if (transaction["image-url-thumb"] !== null) {
      if (imageLoading) {
        this.showLoadingImage();
        image = (
          <div class={styles.imageContainer}>
            <LoadingAnimation />
          </div>
        );
      } else {
        image = (
          <img
            class={styles.imageContainer}
            src={transaction["image-url-thumb"]}
            onClick={() => showFullImage(transaction["image-url-original"])}
            onError={() => this.showLoadingImage(this)}
          />
        );
      }
    }

    return (
      <div class={styles.transaction} id={transaction.id}>
        <div class={styles.transactionContent}>
          <div class={styles.transactionValue}>
            <p class={styles.value} id="kudoAmount">
              {transaction.amount + transaction["votes-count"]}
            </p>
            <div class={styles.kudoCurrency}>₭</div>
            <hr class={styles.divider} />
          </div>
          <div class={styles.transactionDescription}>
            <p class={styles.transactionText}>
              {transaction.sender.name}: {transaction.amount}{" "}
              <span class={styles.kudoCurrency}>₭</span> {I18n.t("feed.to")}{" "}
              <span id="receiver"> {transaction.receiver.name} </span>
              {I18n.t("feed.for")}{" "}
              <span id="activity">
                {emojify(transaction.activity, emojiOptions)}
              </span>
            </p>
            {image}
          </div>
        </div>
        <div class={styles.transactionBottom}>
          <div class={styles.transactionUsers}>
            <img src={this.state.avatarSender} />
            <img
              class={styles.imgReceiver}
              src={this.state.avatarReceiver}
            />
          </div>
          <div class={styles.timeStamp}>
            <span>{transaction.interval}</span>
          </div>
          <div class={styles.transactionAction}>
            <a
              id="likeTransaction"
              onClick={() => {
                likeAction(transaction.id);
              }}
            >
              <img src={thumb} />
            </a>
            <p class={styles.likes}>
              + <span id="likeAmount">{transaction["votes-count"]}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
