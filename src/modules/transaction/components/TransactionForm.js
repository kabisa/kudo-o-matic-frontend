import { h, Component } from "preact";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";
import Select from "react-select";

import kudoIcon from "src/assets/icons/kudo.svg";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      receiver: "",
      activity: "",
      formSubmittable: false,
      formDisabled: false
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ formDisabled: props.formError });
  }

  isFormSubmittable() {
    return (
      this.state.amount !== "" &&
      this.state.receiver !== "" &&
      this.state.activity !== ""
    );
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onChange(e) {
    this.setState({ receiver: e.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ formDisabled: true });
    this.props.addTransaction(
      this.state.amount,
      this.state.receiver,
      this.state.activity
    );
  }

  render(
    { formError, users },
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
                className={styles.userSelection}
                value={amount}
                onInput={this.onInput}
              />
            </label>
            <label>
              {I18n.t("transaction.receiver")}

              <Select
                name="receiver"
                value={receiver}
                options={users.map(user => {
                  return { value: user.id, label: user.name };
                })}
                onChange={this.onChange}
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
            <button
              class={styles.kudoButton}
              type="submit"
              disabled={!formSubmittable}
            >
              <img src={kudoIcon} />
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default TransactionForm;
