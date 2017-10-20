import { h } from "preact";
import Settings from "src/config/settings";
import I18n from "src/config/i18n";
import styles from "./GoogleButton.scss";

const GoogleButton = ({ requestApiToken, handleGoogleLoginFailure }) => {
  function login() {
    window.plugins.googleplus.login(
      {
        webClientId: Settings.googleClientID,
        hostedDomain: Settings.googleHostedDomain
      },
      function(obj) {
        const googleToken = {
          tokenObj: {
            id_token: obj.idToken
          },
          profileObj: {
            name: obj.displayName,
            email: obj.email,
            googleId: obj.userId,
            imageUrl: obj.imageUrl
          }
        };
        console.log(obj);
        requestApiToken(googleToken);
      },
      function(msg) {
        console.log(msg);
        handleGoogleLoginFailure(msg);
      }
    );
    window.plugins.googleplus.getSigningCertificateFingerprint(function(
      fingerprint
    ) {
      alert(fingerprint);
    });
  }

  return (
    <button className={styles.buttonGoogle} onClick={login}>
      {I18n.t("login.login_using_google")}
    </button>
  );
};

export default GoogleButton;
