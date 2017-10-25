import { h } from "preact";
import TransactionForm from "../components/TransactionForm";
import styles from "./TransactionContainer.scss";

import kudoIcon from "src/assets/icons/kudo.svg";
import closeIcon from "src/assets/icons/close.svg";

const makeTransaction = (amount, receiver, activity) => {
  addTransaction(amount, activity, user.id, receiver, 4, user.apiToken);
};

const TransactionContainer = ({ makeFormInvisible }) => {
  return (
    <div class={styles.formContainer}>
      <button class={styles.closeButton} onClick={() => makeFormInvisible()}>
        <img src={closeIcon} />
      </button>

      <TransactionForm />

      <button class={styles.kudoButton} type="submit">
        <img src={kudoIcon} />
      </button>
    </div>
  );
};

export default TransactionContainer;
