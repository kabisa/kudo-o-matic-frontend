import { h, Component } from "preact";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";

export class ProfilePage extends Component {
  render() {
    return (
      <Page>
        <Header>
          <h1>PROFILE</h1>
        </Header>
        <main />
      </Page>
    );
  }
}

export default ProfilePage;
