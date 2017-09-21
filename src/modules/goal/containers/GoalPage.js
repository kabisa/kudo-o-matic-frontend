import { h, Component } from "preact";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";

export class GoalPage extends Component {
  render() {
    return (
      <Page>
        <Header>
          <h1>GOAL</h1>
        </Header>
        <main />
      </Page>
    );
  }
}

export default GoalPage;
