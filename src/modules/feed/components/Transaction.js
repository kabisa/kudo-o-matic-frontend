import { h } from "preact";
import styles from "./Transaction.scss";
import LikeIconInactive from "src/assets/icons/transaction/thumbs-up-inactive.svg";
import LikeIconActive from "src/assets/icons/transaction/thumbs-up-active.svg";

export const Transaction = ({ transaction, likeAction }) => {
  let thumb;
  if (transaction["api-user-voted"]) {
    thumb = LikeIconActive;
  } else {
    thumb = LikeIconInactive;
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
};

export default Transaction;
