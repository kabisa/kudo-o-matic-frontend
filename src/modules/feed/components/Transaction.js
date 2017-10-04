import { h } from "preact";
import styles from "./Transaction.scss";

export const Transaction = () => {
  return (
    <div class={styles.transaction}>
      <div class={styles.transactionContent}>
        <div class={styles.transactionValue}>
          <div class={styles.value}>
            13 <span class={styles.kudoCurrency}>₭</span>
          </div>
          <div class={styles.divider} />
        </div>
      </div>
      <hr class={styles.hr} />
    </div>
  );
};

export default Transaction;
