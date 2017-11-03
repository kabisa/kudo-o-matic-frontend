import { h, Component } from "preact";
import { connect } from "preact-redux";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";

import { searchUser } from "src/modules/transaction/actions";
import Suggestions from "./UserSuggestions";

import kudoIcon from "src/assets/icons/kudo.svg";
import photoIcon from "src/assets/icons/photo-camera.svg";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      amount: 0,
      receiver: "",
      activity: "",
      formSubmittable: false,
      formDisabled: false
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
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

  searchUsers(e) {
    let searchQuery = e.target.value;
    this.setState({ receiver: searchQuery });
    this.props.searchUser(searchQuery, this.props.users);
    return false;
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onChange(e) {
    this.setState({ receiver: e.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onSelect(user) {
    this.setState({ receiver: user });
    this.props.searchUser("");
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.formSubmittable) {
      this.setState({ error: true });
    } else {
      this.setState({ formDisabled: true });
      this.props.addTransaction(
        this.state.amount,
        this.state.receiver,
        this.state.activity
      );
    }
  }

  render(
    { formError, filteredUsers },
    { error, amount, receiver, activity, formDisabled }
  ) {
    return (
      <div>
        <form class={styles.transactionForm} onSubmit={this.onSubmit}>
          {formError && (
            <div class={styles.formError}>
              {I18n.t("transaction.formError")}
            </div>
          )}
          {error && (
            <div class={styles.formError}>
              {I18n.t("transaction.transactionError")}
            </div>
          )}
          <fieldset disabled={formDisabled}>
            <label>
              {I18n.t("transaction.amount")}
              <div class={styles.amountInput}>
                <input
                  name="amount"
                  type="number"
                  min="1"
                  max="999"
                  className={styles.userSelection}
                  value={amount}
                  onInput={this.onInput}
                  autoFocus={true}
                  class={styles.amountInput}
                />
                <span class={styles.kudoCurrency}>₭</span>
              </div>
            </label>
            <label>
              {I18n.t("transaction.receiver")}

              <input
                value={receiver}
                onInput={this.searchUsers}
                placeholder="Search for users"
              />
              <Suggestions
                searchQuery={receiver}
                users={filteredUsers}
                onSelect={this.onSelect}
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

            <div class={styles.imageButton}>
              <img src={photoIcon} />
              <p>Add a picture</p>
            </div>

            <button
              id="submitTransaction"
              class={styles.kudoButton}
              type="submit"
            >
              <img src={kudoIcon} />
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filteredUsers: state.transaction.filteredUsers,
  users: state.transaction.users
});

const mapDispatchToProps = {
  searchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
