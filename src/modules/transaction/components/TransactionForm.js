import { h } from "preact";
import styles from "./TransactionForm.scss";
import kudoIcon from "src/assets/icons/kudo.svg";
import closeIcon from "src/assets/icons/close.svg";
import I18n from "src/config/i18n";

export const TransactionForm = ({ makeFormInvisible }) => {
  return (
    <div class={styles.formContainer}>
      <button class={styles.closeButton} onClick={() => makeFormInvisible()}>
        <img src={closeIcon} />
      </button>
      <form class={styles.transactionForm}>
        <label>
          {I18n.t("transaction.amount")}
          <input id="amount" type="number" />
        </label>
        <label>
          {I18n.t("transaction.receiver")}
          <input id="receiver" type="text" />
        </label>
        <label>
          {I18n.t("transaction.giving_kudos_for")}
          <textarea maxLength="90" id="receiver" type="text" />
        </label>
      </form>
      <button class={styles.kudoButton}>
        <img src={kudoIcon} />
      </button>
    </div>
  );
};

export default TransactionForm;
