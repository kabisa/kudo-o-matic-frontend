import { h, Component } from "preact";
import { connect } from "preact-redux";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";

import { searchUser } from "src/modules/transaction/actions";
import Suggestions from "./UserSuggestions";
import SelectedUser from "./SelectedUser";

import kudoIcon from "src/assets/icons/kudo.svg";
import photoIcon from "src/assets/icons/photo-camera.svg";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      amount: "",
      receiver: {},
      activity: "",
      formSubmittable: false,
      formDisabled: false
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ formDisabled: props.formError });
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById("inputAmount").focus();
    }, 300);
  }

  isFormSubmittable() {
    return (
      this.state.amount !== "" &&
      this.state.receiver !== undefined &&
      this.state.activity !== ""
    );
  }

  searchUsers(e) {
    let searchQuery = e.target.value;
    this.setState({ receiver: { name: searchQuery } });
    this.props.searchUser(searchQuery, this.props.users);
    return false;
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onSelect(user) {
    this.setState({ receiver: user.user });
    this.props.searchUser("", []);
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  clearSelection() {
    this.setState({ receiver: {} });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.formSubmittable) {
      this.setState({ error: true });
    } else {
      this.setState({ formDisabled: true });
      this.props.addTransaction(
        this.state.amount,
        this.state.receiver.id,
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
                  id="inputAmount"
                  min="1"
                  max="999"
                  className={styles.userSelection}
                  value={amount}
                  onInput={this.onInput}
                  class={styles.amountInput}
                />
                <span class={styles.kudoCurrency}>₭</span>
              </div>
            </label>
            <label>
              {I18n.t("transaction.receiver")}

              {receiver.id !== undefined ? (
                <SelectedUser
                  user={receiver}
                  clearSelection={this.clearSelection}
                />
              ) : (
                <div>
                  <input
                    value={receiver.name}
                    onInput={this.searchUsers}
                    placeholder="Search for users"
                  />
                  <Suggestions
                    searchQuery={receiver.name}
                    users={filteredUsers}
                    onSelect={this.onSelect}
                  />
                </div>
              )}
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
