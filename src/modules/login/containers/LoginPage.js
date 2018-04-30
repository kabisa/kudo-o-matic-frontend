import { h, Component } from "preact";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { Page } from "src/components/Page";
import LoginForm from "../components/LoginForm";
import I18n from "src/config/i18n";

import { fetchAccessToken, saveErrorMessage } from "../actions";

import styles from "./LoginPage.scss";

export class LoginPage extends Component {
  componentWillMount() {
    if (this.props.user != undefined) {
      if (typeof this.props.user.apiToken !== "undefined") {
        route("/", true);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != undefined) {
      if (typeof nextProps.user.apiToken !== "undefined") {
        route("/", true);
      }
    }
  }

  render() {
    return (
      <Page>
        <main class={styles.main}>
          <div class={styles.logo} />
          <div class={styles.login}>
            <LoginForm fetchAccessToken={this.props.fetchAccessToken} saveErrorMessage={this.props.saveErrorMessage} error={this.props.error} />
          </div>
          <div class={styles.disclaimer}>
            <span>{I18n.t("login.disclaimer")}</span>
          </div>
        </main>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  error: state.authentication.error
});

const mapDispatchToProps = {
  fetchAccessToken,
  saveErrorMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
