import { h, Component } from "preact";
import styles from "./UserSuggestion.scss";
import Avatar from "src/assets/avatars/blank_avatar.jpg";

export default class UserSuggestion extends Component {
  shouldComponentUpdate({ user, onSelect }) {
    return user !== this.props.user || onSelect !== this.props.onSelect;
  }

  render({ onSelect, user }) {
    if(!user.user["avatar-url"] || user.user["avatar-url"] == ""){
      user.user["avatar-url"] = Avatar;
    }
    return (
      <div
        class={styles["autocomplete-suggestion"]}
        onClick={() => onSelect(user)}
      >
        <div class={styles.left}>
          <img src={user.user["avatar-url"]} />
        </div>
        <div class={styles.right}>{user.user.name}</div>
      </div>
    );
  }
}
