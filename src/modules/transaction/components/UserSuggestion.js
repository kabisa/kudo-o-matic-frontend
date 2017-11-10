import { h, Component } from "preact";
import styles from "./UserSuggestion.scss";

export default class UserSuggestion extends Component {
  shouldComponentUpdate({ user, onSelect }) {
    return user !== this.props.user || onSelect !== this.props.onSelect;
  }

  render({ onSelect, user }) {
    return (
      <div
        class={styles["autocomplete-suggestion"]}
        onClick={() => onSelect(user)}
        id="userSuggestion"
      >
        <div class={styles.left}>
          <img src={user.user["avatar-url"]} />
        </div>
        <div class={styles.right}>{user.user.name}</div>
      </div>
    );
  }
}
