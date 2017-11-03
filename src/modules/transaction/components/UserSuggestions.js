import { h, Component } from "preact";
import UserSuggestion from "./UserSuggestion";

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
      <div class="autocomplete-suggestions">
        {searchQuery && searchQuery.length && users.length ? (
          users.map((user, i) => (
            <UserSuggestion
              key={Object.keys(user)[0]}
              onSelect={onSelect}
              user={user}
            />
          ))
        ) : searchQuery && searchQuery.length ? (
          <div class="autocomplete-suggestion">
            No country found with that name.
          </div>
        ) : null}
      </div>
    );
  }
}
