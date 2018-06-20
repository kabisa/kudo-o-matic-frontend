import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import KudoCounter from "../components/KudoCounter";
import styles from "./GoalPage.scss";
import I18n from "src/config/i18n";

import { fetchCurrentGoalState } from "../actions";

export class GoalPage extends Component {
  componentWillMount() {
    this.props.fetchData(this.props.user.apiToken, this.props.team.id);
  }

  render({ currentAmount, nextAmount, nextText, team }) {
    return (
      <Page id="goalPage">
        <Header>
          <h1>{team.name} {I18n.t("goal.title")}</h1>
        </Header>
        <main class={styles.main}>
          {currentAmount && nextAmount && 
          <KudoCounter
            class={styles.kudoCounter}
            currentAmount={currentAmount}
            nextAmount={nextAmount}
            nextText={nextText}
          />}
        </main>
      </Page>
    );
  }
}
const mapStateToProps = state => ({
  apiToken: state.authentication.apiToken,
  team: state.teams.team,
  currentAmount: state.goal.currentBalance.amount,
  nextAmount: state.goal.nextGoal.amount,
  nextText: state.goal.nextGoal.name
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (token, teamId) => dispatch(fetchCurrentGoalState(token, teamId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalPage);
