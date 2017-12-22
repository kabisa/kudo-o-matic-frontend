import { h } from "preact";
import styles from "./LoadingScreen.scss";
import LoadingAnimation from "src/components/LoadingAnimation";

const LoadingScreen = () => {
  return (
    <div class={styles.loadingScreen}>
      <LoadingAnimation />
      <p>Processing transaction...</p>
    </div>
  );
};

export default LoadingScreen;
