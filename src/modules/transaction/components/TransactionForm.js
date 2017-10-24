import { h } from "preact";
import styles from "./TransactionForm.scss";

export const TransactionForm = ({ makeFormInvisible }) => {
  return (
    <div class={styles.formContainer}>
      <button class={styles.closeButton} onClick={() => makeFormInvisible()}>
        X
      </button>
      <form class={styles.transactionForm}>
        <label>
          Amount
          <input id="amount" type="number" />
        </label>
        <label>
          Receiver
          <input id="receiver" type="text" />
        </label>
        <label>
          I'm giving ₭udo's for
          <textarea maxLength="90" id="receiver" type="text" />
        </label>
      </form>
      <button class={styles.kudoButton}>₭</button>
    </div>
  );
};

export default TransactionForm;
