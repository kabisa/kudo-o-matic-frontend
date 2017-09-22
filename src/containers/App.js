import { h } from "preact";
import { Router } from "preact-router";

import FeedPage from "src/modules/feed/containers/FeedPage";
import GoalPage from "src/modules/goal/containers/GoalPage";
import StatisticsPage from "src/modules/statistics/containers/StatisticsPage";
import ProfilePage from "src/modules/profile/containers/ProfilePage";

import NavBar from "src/components/NavBar";

export default () => (
  <div>
    <Router>
      <FeedPage path="/feed" default />
      <GoalPage path="/goal" />
      <StatisticsPage path="/statistics" />
      <ProfilePage path="/profile" />
    </Router>
    <NavBar />
  </div>
);
