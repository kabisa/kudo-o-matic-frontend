import { h, Component } from "preact";
import { Page } from "src/components/Page";
import I18n from "src/config/i18n";

import styles from "./LoginPage.scss";

export class LoginPage extends Component {
  render() {
    return (
      <Page>
        <main class={styles.main}>
          <div class={styles.logo} />
          <div class={styles.login}>
            <button type="button" class={styles.buttonGoogle}>
              <span>{I18n.t("login.login_using_google")}</span>
            </button>
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
