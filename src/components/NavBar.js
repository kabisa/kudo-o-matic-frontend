import { h } from "preact";
import { Link } from "preact-router/match";
import styles from "./NavBar.scss";
import feedIcon from "src/assets/icons/nav/feed.svg";
import goalIcon from "src/assets/icons/nav/goal.svg";
import profileIcon from "src/assets/icons/nav/profile.svg";
import statisticsIcon from "src/assets/icons/nav/statistics.svg";

export const NavBar = () => {
  return (
    <nav class={styles.navBar}>
      <div class={styles.navLeft}>
        <Link href="/feed">
          <button class={styles.navButton}>
            <img src={feedIcon} />
            <span>Feed</span>
          </button>
        </Link>
        <Link href="/goal">
          <button class={styles.navButton}>
            <img src={goalIcon} />
            <span>Goal</span>
          </button>
        </Link>
      </div>

      <button class={styles.kudoButton}>₭</button>

      <div class={styles.navRight}>
        <Link href="/statistics">
          <button class={styles.navButton}>
            <img src={statisticsIcon} />
            <span>Statistics</span>
          </button>
        </Link>
        <Link href="/profile">
          <button class={styles.navButton}>
            <img src={profileIcon} />
            <span>Profile</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
