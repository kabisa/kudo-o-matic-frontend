import { h, Component } from "preact";
import Pull from "src/support/pulljs";
import PullToRefresh from "pulltorefreshjs";
import I18n from "src/config/i18n";

// !!!BIG HACK¡¡¡ to prevent having to re-init Pull all the time.
// Basically we give it an anchor that does not get re-rendered,
// so the library is free to inject code in it via DOM.
// Library is not (p)react friendly.
class PullAnchor extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="pull-anchor" />;
  }
}

class PTR extends Component {
  componentDidMount() {
    PullToRefresh.init({
      mainElement: "#main",
      onRefresh: function() {
        alert("refresh");
      }
    });
  }

  componentWillUnmount() {
    const { handlers } = this.puller;
    handlers && this.puller.destroy(handlers);
  }

  render({ children, id, className, onScroll }) {
    return (
      <main id="main" class={className} onScroll={e => onScroll(e)}>
        <PullAnchor />
        <div id="pull-container">{children}</div>
      </main>
    );
  }
}

export default PTR;
