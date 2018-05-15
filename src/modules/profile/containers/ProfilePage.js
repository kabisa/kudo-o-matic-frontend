import { h, Component } from "preact";
import { route } from "preact-router";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import { UserStatistics } from "../components/UserStatistics";
import I18n from "src/config/i18n";
import styles from "./ProfilePage.scss";
import { handleLogoutUser, fetchAllUserstats, fetchUserInfo } from "../actions";

export class ProfilePage extends Component {
  componentWillMount() {
    this.props.fetchAllUserstats(this.props.user.apiToken);
    this.props.fetchUserInfo(this.props.user.apiToken);
  }

  logOutUser = () => {
    this.props.handleLogoutUser();
    route("/login", true);
  };

  render({ user, userstats }) {
    const { sent, received, total } = userstats;

    return (
      <Page id="profilePage"> 
        <Header>
          <h1>{I18n.t("profile.title")}</h1>
        </Header>
        <main class={styles.main}>
          <h3 class={styles.name}>{user.name}</h3>
          <img class={styles.profileImage} src={user.imageUri} />
          <div class={styles.addPicture}></div>
          <h3 class={styles.header}>{I18n.t("profile.your_transactions")}</h3>
          <UserStatistics sent={sent} received={received} total={total} />
          <button className={styles.logoutButton} onClick={this.logOutUser}>
            {I18n.t("profile.logout")}
          </button>
        </main>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: {
    apiToken: state.authentication.user.apiToken,
    name: state.profile.user.name,
    imageUri: state.profile.user.imageUri
  },
  userstats: state.profile.userstats
});

const mapDispatchToProps = {
  handleLogoutUser,
  fetchAllUserstats,
  fetchUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
