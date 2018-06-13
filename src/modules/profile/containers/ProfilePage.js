import { h, Component } from "preact";
import { route } from "preact-router";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import { UserStatistics } from "../components/UserStatistics";
import { Team } from "../components/Team";
import {Menu} from "../components/Menu";
import I18n from "src/config/i18n";
import styles from "./ProfilePage.scss";
import { handleLogoutUser, fetchAllUserstats, fetchUserInfo, handleChangeTeam, handleToggleMenu } from "../actions";
import Avatar from "src/assets/avatars/blank_avatar.jpg";

export class ProfilePage extends Component {
  componentWillMount() {
    this.props.fetchAllUserstats(this.props.user.apiToken, this.props.team.id);
    this.props.fetchUserInfo(this.props.user.apiToken, this.props.team.id);
  }

  logOutUser = () => {
    this.props.handleLogoutUser();
    route("/login", true);
  };

  changeTeam = () => {
    this.props.handleChangeTeam();
    route("/teams", true);
  }

  render({ user, userstats }) {
    const { sent, received, total } = userstats;

    if (this.props.user.imageUri == null) {
      this.props.user.imageUri = Avatar;
    }

    return (
      <Page id="profilePage">         
        <Header>          
          <h1>{I18n.t("profile.title")}</h1> 
          <Menu handleLogoutUser={this.props.handleLogoutUser} handleChangeTeam={this.props.handleChangeTeam} handleToggleMenu={this.props.handleToggleMenu} showMenu={this.props.showMenu}/>                   
        </Header>
        <main class={styles.main}>           
          <h3 class={styles.name}>{user.name}</h3>
          <img class={styles.profileImage} src={user.imageUri} /> 
          <h3 class={styles.header}>{I18n.t("profile.team")}</h3>         
          <Team team={this.props.team} />   
          <h3 class={styles.header}>{I18n.t("profile.your_transactions")}</h3>          
          <UserStatistics sent={sent} received={received} total={total} />      
          <h3 class={styles.header}>{user.username}</h3>          
        </main>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: {
    username: state.authentication.user.username,
    apiToken: state.authentication.user.apiToken,
    name: state.profile.user.name,
    imageUri: state.profile.user.imageUri
  },
  team: state.teams.team,
  userstats: state.profile.userstats,
  showMenu: state.profile.showMenu
});

const mapDispatchToProps = {
  handleLogoutUser,
  handleChangeTeam,
  handleToggleMenu,
  fetchAllUserstats,
  fetchUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
