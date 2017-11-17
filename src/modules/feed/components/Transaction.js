import { h, Component } from "preact";
import { imageExists } from "src/support/imageUtils";

import styles from "./Transaction.scss";
import { LoadingAnimation } from "src/components/LoadingAnimation";
import LikeIconInactive from "src/assets/icons/transaction/thumbs-up-inactive.svg";
import LikeIconActive from "src/assets/icons/transaction/thumbs-up-active.svg";

export class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true
    };
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
      <div class={styles.transaction} id="transaction">
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
              <span class={styles.kudoCurrency}>₭</span> to{" "}
              <span id="receiver"> {transaction.receiver.name} </span>
              for <span id="activity">{transaction.activity}</span>
            </p>
            {image}
            <p class={styles.transactionTimestamp}>{transaction.interval}</p>
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
        <hr class={styles.hr} />
      </div>
    );
  }
}

export default Transaction;
