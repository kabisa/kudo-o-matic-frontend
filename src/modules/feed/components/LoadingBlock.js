import { h } from "preact";
import styles from "./LoadingBlock.scss";
import LoadingAnimation from "src/components/LoadingAnimation";

const LoadingBlock = () => {
  return (
    <div class={styles.loadingBlock}>
      <LoadingAnimation />
    </div>
  );
};

export default LoadingBlock;
