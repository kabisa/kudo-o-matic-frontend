import { h, Component } from "preact";
import { Page } from "src/components/Page";
import I18n from "src/config/i18n";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID, GOOGLE_HOSTED_DOMAIN } from "src/globals";

import styles from "./LoginPage.scss";

const responseGoogle = () => {};

export class LoginPage extends Component {
  render() {
    return (
      <Page>
        <main class={styles.main}>
          <div class={styles.logo} />
          <div class={styles.login}>
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText={I18n.t("login.login_using_google")}
              hostedDomain={GOOGLE_HOSTED_DOMAIN}
              className={styles.buttonGoogle}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
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

export default LoginPage;
