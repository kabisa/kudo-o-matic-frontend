import { h, Component } from "preact";
import UserSuggestion from "./UserSuggestion";
import styles from "./UserSuggestions.scss";

export default class Suggestions extends Component {
  shouldComponentUpdate({
    searchQuery,
    focusedItem,
    inputFocused,
    users,
    onSelect
  }) {
    return (
      searchQuery !== this.props.searchQuery ||
      focusedItem !== this.props.focusedItem ||
      inputFocused !== this.props.inputFocused ||
      users !== this.props.users ||
      onSelect !== this.props.onSelect
    );
  }

  render({ searchQuery, users, onSelect }) {
    return (
      <div class={styles["autocomplete-suggestions"]}>
        {searchQuery && searchQuery.length && users.length ? (
          users.map((user, i) => (
            <UserSuggestion key={i} onSelect={onSelect} user={user} />
          ))
        ) : searchQuery && searchQuery.length ? (
          <div class={styles["autocomplete-nosuggestions"]}>
            No users found with that name.
          </div>
        ) : null}
      </div>
    );
  }
}
