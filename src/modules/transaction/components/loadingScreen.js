import { h } from "preact";
import styles from "./LoadingScreen.scss";
import LoadingAnimation from "src/components/LoadingAnimation";
import I18n from "src/config/i18n";

const LoadingScreen = () => {
  return (
    <div class={styles.loadingScreen}>
      <LoadingAnimation />
      <p>{I18n.t("transaction.processing")}</p>
    </div>
  );
};

export default LoadingScreen;
