import { h } from "preact";
import { route } from "preact-router";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import I18n from "src/config/i18n";
import styles from "./ProfilePage.scss";
import { handleLogoutUser } from "../actions";

const ProfilePage = ({ user, handleLogoutUser }) => {
  const logOutUser = () => {
    handleLogoutUser();
    route("/login", true);
  };
  return (
    <Page id="profilePage">
      <Header>
        <h1>{I18n.t("profile.title")}</h1>
      </Header>
      <main class={styles.main}>
        <h3 class={styles.name}>{user.name}</h3>
        <img class={styles.profileImage} src={user.imageUri} />
        <button className={styles.logoutButton} onClick={logOutUser}>
          {I18n.t("profile.logout")}
        </button>
      </main>
    </Page>
  );
};
const mapStateToProps = state => ({
  user: state.authentication.user
});

const mapDispatchToProps = {
  handleLogoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
