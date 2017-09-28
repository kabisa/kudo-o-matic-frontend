import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import KudoCounter from "../components/Kudocounter";
import I18n from "src/config/i18n";
import { fetchCurrentGoalState } from "../actions";

export class GoalPage extends Component {
  componentWillMount() {
    this.props.fetchData(this.props.apiToken);
  }

  render({ currentAmount, nextGoal }) {
    return (
      <Page>
        <Header>
          <h1>{I18n.t("goal.title")}</h1>
        </Header>
        <main>
          <KudoCounter currentAmount={currentAmount} nextGoal={nextGoal} />
        </main>
      </Page>
    );
  }
}
const mapStateToProps = state => ({
  apiToken: state.authentication.apiToken,
  currentAmount: state.goal.currentAmount,
  nextGoal: state.goal.nextGoal
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData: token => dispatch(fetchCurrentGoalState(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalPage);
