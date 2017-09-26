import { h, Component } from "preact";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { Page } from "src/components/Page";
import GoogleButton from "../components/GoogleButton";
import I18n from "src/config/i18n";
import { requestApiToken, handleGoogleLoginFailure } from "../actions";

import styles from "./LoginPage.scss";

export class LoginPage extends Component {
  componentWillMount() {
    if (typeof this.props.user.apiToken !== "undefined") {
      route("/", true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.user.apiToken !== "undefined") {
      route("/", true);
    }
  }

  render({ requestApiToken, handleGoogleLoginFailure }) {
    return (
      <Page>
        <main class={styles.main}>
          <div class={styles.logo} />
          <div class={styles.login}>
            <GoogleButton
              requestApiToken={requestApiToken}
              handleGoogleLoginFailure={handleGoogleLoginFailure}
            />
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
  googleError: state.authentication.googleError,
  apiError: state.authentication.apiError,
  user: state.authentication.user
});

const mapDispatchToProps = {
  requestApiToken,
  handleGoogleLoginFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
