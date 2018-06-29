import { h } from "preact";
import styles from "./SelectedObject.scss";
import clearIcon from "src/assets/icons/clear.svg";
import Avatar from "src/assets/avatars/blank_avatar.jpg";

const SelectedUser = ({ user, clearSelection }) => {
  if(!user["avatar-url"] || user["avatar-url"] == "") {
    user["avatar-url"] = Avatar;
  }
  return (
    <div class={styles.selectedUser}>
      <div class={styles.left}>
        <img src={user["avatar-url"]} />
      </div>
      <div class={styles.right}>{user.name}</div>
      <div onClick={clearSelection} class={styles.clear}>
        <img src={clearIcon} />
      </div>
    </div>
  );
};

export default SelectedUser;
