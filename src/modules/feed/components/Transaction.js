import { h } from "preact";
import styles from "./Transaction.scss";
import LikeIconInactive from "src/assets/icons/transaction/thumbs-up-inactive.svg";
import LikeIconActive from "src/assets/icons/transaction/thumbs-up-active.svg";

export const Transaction = ({ amount, from, to, reason, likes, liked }) => {
  let likeButton;
  if (liked) {
    likeButton = <img src={LikeIconActive} class={styles.thumb} />;
  } else {
    likeButton = <img src={LikeIconInactive} class={styles.thumb} />;
  }

  return (
    <div class={styles.transaction}>
      <div class={styles.transactionContent}>
        <div class={styles.transactionValue}>
          <div class={styles.value}>{amount}</div>
          <div class={styles.kudoCurrency}>₭</div>
          <div class={styles.divider} />
        </div>
        <div class={styles.transactionDescription}>
          <div class={styles.transactionText}>
            {from}: {amount} <span class={styles.kudoCurrency}>₭</span> to {to}{" "}
            for {reason}
          </div>
          <div class={styles.transactionTimestamp}>1 day ago</div>
        </div>
        <div class={styles.transactionAction}>
          {likeButton}
          <div class={styles.likes}>+{likes}</div>
        </div>
      </div>
      <hr class={styles.hr} />
    </div>
  );
};

export default Transaction;
