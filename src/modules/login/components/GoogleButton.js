import { h } from "preact";
import GoogleLogin from "react-google-login";
import Settings from "src/config/settings";
import I18n from "src/config/i18n";
import styles from "./GoogleButton.scss";

const GoogleButton = ({ requestApiToken, handleGoogleLoginFailure }) => {
  return (
    <GoogleLogin
      clientId={Settings.googleClientID}
      buttonText={I18n.t("login.login_using_google")}
      hostedDomain={Settings.googleHostedDomain}
      className={styles.buttonGoogle}
      onSuccess={requestApiToken}
      onFailure={handleGoogleLoginFailure}
    />
  );
};

export default GoogleButton;
