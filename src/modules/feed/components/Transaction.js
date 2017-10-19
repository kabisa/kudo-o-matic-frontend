import { h } from "preact";
import styles from "./Transaction.scss";
import LikeIconInactive from "src/assets/icons/transaction/thumbs-up-inactive.svg";
import LikeIconActive from "src/assets/icons/transaction/thumbs-up-active.svg";

export const Transaction = ({ transaction, likeAction }) => {
  let thumb;
  if (transaction.voted) {
    thumb = LikeIconActive;
  } else {
    thumb = LikeIconInactive;
  }
  return (
    <div class={styles.transaction} id="transaction">
      <div class={styles.transactionContent}>
        <div class={styles.transactionValue}>
          <div class={styles.value} id="kudoAmount">
            {transaction.amount + transaction["likes-amount"]}
          </div>
          <div class={styles.kudoCurrency}>₭</div>
          <div class={styles.divider} />
        </div>
        <div class={styles.transactionDescription}>
          <div class={styles.transactionText}>
            {transaction.sender.name}: {transaction.amount}{" "}
            <span class={styles.kudoCurrency}>₭</span> to{" "}
            {transaction.receiver.name} for {transaction.activity.name}
          </div>
          <div class={styles.transactionTimestamp}>
            {transaction.interval} ago
          </div>
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
          <div class={styles.likes}>
            + <span id="likeAmount">{transaction["likes-amount"]}</span>
          </div>
        </div>
      </div>
      <hr class={styles.hr} />
    </div>
  );
};

export default Transaction;
