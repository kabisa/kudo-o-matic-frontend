import { h, Component } from "preact";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";

import kudoIcon from "src/assets/icons/kudo.svg";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      receiver: "",
      activity: "",
      formDisabled: false
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ formDisabled: !props.formError });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    console.log("done");
    e.preventDefault();
    this.setState({ formDisabled: true });
    this.props.addTransaction(
      this.state.amount,
      this.state.receiver,
      this.state.activity
    );
  }

  render(
    { formError },
    { amount, receiver, activity, formSubmittable, formDisabled }
  ) {
    return (
      <div>
        <form class={styles.transactionForm} onSubmit={this.onSubmit}>
          {formError && <p>{I18n.t("transaction.transactionError")}</p>}
          <fieldset disabled={formDisabled}>
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
            <button class={styles.kudoButton} type="submit">
              <img src={kudoIcon} />
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default TransactionForm;
