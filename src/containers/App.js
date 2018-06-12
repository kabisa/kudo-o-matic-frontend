import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Router, route } from "preact-router";

import {
  makeFormInvisible,
  makeFormVisible
} from "../modules/transaction/actions";
import { fetchAllTransactions } from "src/modules/feed/actions";
import { subscribeToNotifications } from "src/support/firebaseInstance";

import FeedPage from "src/modules/feed/containers/FeedPage";
import GoalPage from "src/modules/goal/containers/GoalPage";
import StatisticsPage from "src/modules/statistics/containers/StatisticsPage";
import ProfilePage from "src/modules/profile/containers/ProfilePage";

import TransactionPage from "src/modules/transaction/containers/TransactionPage";
import NavBar from "src/components/NavBar";

export class App extends Component {
  componentWillMount() {
    if (typeof this.props.user.apiToken === "undefined") {
      route("/login", true); 
    }
    if (typeof this.props.team.id === "undefined" && this.props.user.apiToken) {
      route("/teams", true); 
    }
  }

  componentDidMount() {
    // document.addEventListener(
    //   "deviceready",
    //   subscribeToNotifications(
    //     this.props.fetchAllTransactions,
    //     this.props.user
    //   ),
    //   false
    // );
  }

  render({ transactionFormVisible, makeFormVisible, makeFormInvisible }) {
    const openFeed = () => {
      route("/login", true);
    };

    return (
      <div>
        <Router>
          <FeedPage path="/feed" default />
          <GoalPage path="/goal" user={this.props.user} />
          <StatisticsPage path="/statistics" />
          <ProfilePage path="/profile" user={this.props.user} />
          <TransactionPage path="/transaction" makeFormInvisible={openFeed} />          
        </Router>

        {transactionFormVisible ? (
          <TransactionPage makeFormInvisible={makeFormInvisible} />
        ) : (
            <NavBar makeFormVisible={makeFormVisible} />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.authentication.user,
    team: state.teams.team,
    transactionFormVisible: state.transaction.formVisible
  });

const mapDispatchToProps = {
  makeFormVisible,
  makeFormInvisible,
  fetchAllTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
