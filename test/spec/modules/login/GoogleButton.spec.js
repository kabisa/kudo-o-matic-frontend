import { h, render } from "preact";
import GoogleButton from "src/modules/login/components/GoogleButton";
import GoogleLogin from "react-google-login";
import styles from "src/modules/login/components/GoogleButton.scss";
import Settings from "src/config/settings";
import I18n from "src/config/i18n";

import {
  requestApiToken,
  handleGoogleLoginFailure
} from "src/modules/login/actions";

describe("GoogleButton", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  it("shows GoogleLogin Component", function() {
    const page = mount(
      <GoogleButton
        requestApiToken={requestApiToken}
        handleGoogleLoginFailure={handleGoogleLoginFailure}
      />
    );
    expect(page.outerHTML).to.contain(
      mount(
        <GoogleLogin
          clientId={Settings.googleClientID}
          buttonText={I18n.t("login.login_using_google")}
          hostedDomain={Settings.googleHostedDomain}
          className={styles.buttonGoogle}
          onSuccess={requestApiToken}
          onFailure={handleGoogleLoginFailure}
        />
      ).outerHTML
    );
  });
});
