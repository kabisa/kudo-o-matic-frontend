import { h } from "preact";
import styles from "./ImageView.scss";
import closeIcon from "src/assets/icons/close.svg";

const imageView = ({ imageURL, closeImage }) => {
  return (
    <div class={styles.imageContainer}>
      <a class={styles.closeButton} onClick={() => closeImage()}>
        <img src={closeIcon} />
      </a>
      <img class={styles.fullImage} src={imageURL} />
    </div>
  );
};

export default imageView;
