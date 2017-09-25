import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import I18n from "src/config/i18n";
import GoogleLogin from "react-google-login";
import Settings from "src/config/settings";
import { requestApiToken, handleGoogleLoginFailure } from "../actions";

import styles from "./LoginPage.scss";

export class LoginPage extends Component {
  render({ requestApiToken, handleGoogleLoginFailure }) {
    return (
      <Page>
        <main class={styles.main}>
          <div class={styles.logo} />
          <div class={styles.login}>
            <GoogleLogin
              clientId={Settings.googleClientID}
              buttonText={I18n.t("login.login_using_google")}
              hostedDomain={Settings.googleHostedDomain}
              className={styles.buttonGoogle}
              onSuccess={requestApiToken}
              onFailure={handleGoogleLoginFailure}
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
  apiError: state.authentication.apiError
});

const mapDispatchToProps = {
  requestApiToken,
  handleGoogleLoginFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
