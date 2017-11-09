import { h } from "preact";
import I18n from "src/config/i18n";
import styles from "./SelectedObject.scss";

const SelectedUser = ({ imageData, clearImage }) => {
  return (
    <div class={styles.selectedUser}>
      <div class={styles.left}>
        <img src={"data:image/jpeg;base64," + imageData} />
      </div>
      <div class={styles.right}>{I18n.t("transaction.selectedImage")}</div>
      <div onClick={clearImage} class={styles.clear}>
        Clear
      </div>
    </div>
  );
};

export default SelectedUser;
