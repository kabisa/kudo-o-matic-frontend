import { h, Component } from "preact";
import styles from "./TransactionForm.scss";
import kudoIcon from "src/assets/icons/kudo.svg";
import closeIcon from "src/assets/icons/close.svg";
import I18n from "src/config/i18n";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      receiver: "",
      activity: ""
    };
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addTransaction(
      this.state.amount,
      this.state.receiver,
      this.state.activity
    );
  }

  render({ makeFormInvisible, amount, receiver, activity }) {
    return (
      <div class={styles.formContainer}>
        <button class={styles.closeButton} onClick={() => makeFormInvisible()}>
          <img src={closeIcon} />
        </button>
        <form class={styles.transactionForm}>
          <label>
            {I18n.t("transaction.amount")}
            <input
              name="amount"
              type="number"
              value={amount}
              onInput={this.onInput}
            />
          </label>
          <label>
            {I18n.t("transaction.receiver")}
            <input
              name="receiver"
              type="text"
              value={receiver}
              onInput={this.onInput}
            />
          </label>
          <label>
            {I18n.t("transaction.giving_kudos_for")}
            <textarea
              maxLength="90"
              name="activity"
              type="text"
              value={activity}
              onInput={this.onInput}
            />
          </label>
        </form>
        <button class={styles.kudoButton} type="submit">
          <img src={kudoIcon} />
        </button>
      </div>
    );
  }
}
export default TransactionForm;
