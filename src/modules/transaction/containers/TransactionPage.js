import { h, Component } from "preact";
import { connect } from "preact-redux";

import TransactionForm from "../components/TransactionForm";
import styles from "./TransactionPage.scss";
import closeIcon from "src/assets/icons/close.svg";

import { addTransaction, fetchAllUsers } from "../actions";

export class TransactionPage extends Component {
  componentWillMount() {
    if (typeof this.props.user.apiToken === "undefined") {
      location.reload();
    } else {
      this.props.fetchUsers(this.props.user.apiToken, this.props.teamId);
    }
  }

  render({ user, users }) {
    const makeTransaction = (
      amount,
      receiver,
      activity,
      imageData,
      fileType
    ) => {
      this.props.postTransaction(
        amount,
        activity,
        receiver,
        imageData,
        fileType,
        user.apiToken,
        this.props.teamId
      );
    };

    return (
      <div class={styles.formContainer}>
        <button
          id="closeButton"
          class={styles.kudoButton}
          onClick={this.props.makeFormInvisible}
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
  teamId: state.teams.teamId,
  users: state.transaction.users
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: (apiToken, teamId) => dispatch(fetchAllUsers(apiToken, teamId)),
    postTransaction: (
      amount,
      activity,
      receiverId,
      imageData,
      fileType,
      apiToken,
      teamId
    ) => {
      dispatch(
        addTransaction(
          amount,
          activity,
          receiverId,
          imageData,
          fileType,
          apiToken,
          teamId
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
