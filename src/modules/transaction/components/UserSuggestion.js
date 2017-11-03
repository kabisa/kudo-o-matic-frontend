import { h, Component } from "preact";

export default class UserSuggestion extends Component {
  shouldComponentUpdate({ user, onSelect }) {
    return user !== this.props.user || onSelect !== this.props.onSelect;
  }

  render({ user }) {
    return (
      <div
        class={{
          "autocomplete-suggestion animated fadeInUp": true
        }}
        onClick={this.props.onSelect.bind(this, user)}
      >
        <div class="left animated zoomIn">
          <img src={user["avatar-url"]} />
        </div>
        <div class="right">{user.name}</div>
      </div>
    );
  }
}
