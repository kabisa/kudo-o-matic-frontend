import { h, Component } from "preact";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      receiver: "",
      activity: ""
    };

    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addTransaction(
      this.state.amount,
      this.state.receiver,
      this.state.activity
    );
  }

  render({ amount, receiver, activity }) {
    return (
      <div>
        <form class={styles.transactionForm}>
          <label>
            {I18n.t("transaction.amount")}
            <input
              name="amount"
              type="number"
              min="1"
              max="500"
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
      </div>
    );
  }
}

export default TransactionForm;
