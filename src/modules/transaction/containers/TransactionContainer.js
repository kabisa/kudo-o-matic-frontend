import { h, Component } from "preact";
import { connect } from "preact-redux";

import TransactionForm from "../components/TransactionForm";
import styles from "./TransactionContainer.scss";
import closeIcon from "src/assets/icons/close.svg";

import { addTransaction, fetchAllUsers } from "../actions";

export class TransactionContainer extends Component {
  componentWillMount() {
    this.props.fetchUsers(this.props.user.apiToken);
  }

  render({ user, users }) {
    const makeTransaction = (amount, receiver, activity) => {
      this.props.postTransaction(
        amount,
        activity,
        user.id,
        receiver,
        4,
        user.apiToken
      );
    };

    return (
      <div class={styles.formContainer}>
        <button
          class={styles.closeButton}
          onClick={() => this.props.makeFormInvisible()}
        >
          <img src={closeIcon} />
        </button>
        <TransactionForm
          addTransaction={makeTransaction}
          users={users}
          formError={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  users: state.transaction.users
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: apiToken => dispatch(fetchAllUsers(apiToken)),
    postTransaction: (
      amount,
      activity,
      userId,
      receiverId,
      balanceId,
      apiToken
    ) => {
      dispatch(
        addTransaction(
          amount,
          activity,
          userId,
          receiverId,
          balanceId,
          apiToken
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  TransactionContainer
);
