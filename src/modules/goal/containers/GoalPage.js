import { h, Component } from "preact";
import { connect } from "preact-redux";

import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import I18n from "src/config/i18n";
import { fetchCurrentGoalState } from "../actions";

export class GoalPage extends Component {
  componentWillMount() {
    this.props.fetchData(this.props.apiToken);
  }

  render({ currentAmount, nextAmount, nextText }) {
    return (
      <Page>
        <Header>
          <h1>{I18n.t("goal.title")}</h1>
        </Header>
        <main>
          <span>{currentAmount}</span>
          <span>{nextAmount}</span>
          <span>{nextText}</span>
        </main>
      </Page>
    );
  }
}
const mapStateToProps = state => ({
  apiToken: state.authentication.apiToken,
  currentAmount: state.goal.currentBalance.currentAmount,
  nextAmount: state.goal.nextAmount,
  nextText: state.goal.nextText
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData: token => dispatch(fetchCurrentGoalState(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalPage);
