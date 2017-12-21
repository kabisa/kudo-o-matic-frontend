import { h, Component } from "preact";
import I18n from "src/config/i18n";
import Pull from "src/support/pulljs";
import iNoBounce from "inobounce";

const baseSettings = {
  ptrElement: "#pull-anchor",
  mainElement: "#pull-container",
  triggerElement: "#pull-container"
};
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
    const {
      pullInstruction,
      releaseInstruction,
      refreshing,
      onRefresh
    } = this.props;

    iNoBounce.enable;

    if (this.props.enabled) {
      this.puller = Pull.init({
        ...baseSettings,
        instructionsPullToRefresh:
          pullInstruction || I18n.t("pull_to_refresh.pull"),
        instructionsReleaseToRefresh:
          releaseInstruction || I18n.t("pull_to_refresh.release"),
        instructionsRefreshing:
          refreshing || I18n.t("pull_to_refresh.refreshing"),
        onRefresh
      });
    }
  }

  render({ children, id, className, onScroll }) {
    return (
      <main id={id} class={className} onScroll={e => onScroll(e)}>
        <PullAnchor />
        <div id="pull-container">{children}</div>
      </main>
    );
  }
}

export default PTR;
