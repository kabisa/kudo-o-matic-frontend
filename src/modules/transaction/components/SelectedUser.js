import { h } from "preact";
import styles from "./SelectedUser.scss";

const SelectedUser = ({ user, clearSelection }) => {
  return (
    <div class={styles.selectedUser}>
      <div class={styles.left}>
        <img src={user["avatar-url"]} />
      </div>
      <div class={styles.right}>{user.name}</div>
      <div onClick={clearSelection} class={styles.clear}>
        Clear
      </div>
    </div>
  );
};

export default SelectedUser;
