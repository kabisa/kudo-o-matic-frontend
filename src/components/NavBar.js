import { h } from "preact";
import { Link } from "preact-router/match";
import styles from "./NavBar.scss";
import I18n from "src/config/i18n";

import feedIcon from "src/assets/icons/nav/feed.svg";
import goalIcon from "src/assets/icons/nav/goal.svg";
import profileIcon from "src/assets/icons/nav/profile.svg";
import statisticsIcon from "src/assets/icons/nav/statistics.svg";
import kudoIcon from "src/assets/icons/kudo.svg";

export const NavBar = ({ makeFormVisible }) => {
  return (
    <nav class={styles.navBar}>
      <div class={styles.navLeft}>
        <Link href="/feed">
          <div class={styles.navButton} id="feed">
            <img src={feedIcon} />
            <span>{I18n.t("nav.feed")}</span>
          </div>
        </Link>
        <Link href="/goal">
          <div class={styles.navButton} id="goal">
            <img src={goalIcon} />
            <span>{I18n.t("nav.goal")}</span>
          </div>
        </Link>
      </div>

      <button
        class={styles.kudoButton}
        id="openTransaction"
        onClick={() => makeFormVisible()}
      >
        <img src={kudoIcon} />
      </button>

      <div class={styles.navRight}>
        <Link href="/statistics">
          <div class={styles.navButton} id="statistics">
            <img src={statisticsIcon} />
            <span>{I18n.t("nav.statistics")}</span>
          </div>
        </Link>
        <Link href="/profile">
          <div class={styles.navButton} id="profile">
            <img src={profileIcon} />
            <span>{I18n.t("nav.profile")}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
