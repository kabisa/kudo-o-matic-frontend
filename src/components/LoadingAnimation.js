import { h } from "preact";
import styles from "./LoadingAnimation.scss";

export const LoadingAnimation = () => {
  return (
    <div class={styles.imageContainer}>
      <div style="width:100%;height:100%" class={styles.loadingIcon}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
