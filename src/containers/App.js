import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Router, route } from "preact-router";

import FeedPage from "src/modules/feed/containers/FeedPage";
import GoalPage from "src/modules/goal/containers/GoalPage";
import StatisticsPage from "src/modules/statistics/containers/StatisticsPage";
import ProfilePage from "src/modules/profile/containers/ProfilePage";

import NavBar from "src/components/NavBar";

export class App extends Component {
  componentWillMount() {
    if (typeof this.props.user.apiToken === "undefined") {
      route("/login", true);
    }
  }

  render() {
    return (
      <div>
        <Router>
          <FeedPage path="/feed" default />
          <GoalPage path="/goal" />
          <StatisticsPage path="/statistics" />
          <ProfilePage path="/profile" user={this.props.user} />
        </Router>
        <NavBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(App);
