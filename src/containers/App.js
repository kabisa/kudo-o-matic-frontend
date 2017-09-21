import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { augmentRouter } from "src/support/pageTransitionSupport";

import LoginPage from "src/modules/login/containers/LoginPage";
import FeedPage from "src/modules/feed/containers/FeedPage";
import GoalPage from "src/modules/goal/containers/GoalPage";
import StatisticsPage from "src/modules/statistics/containers/StatisticsPage";
import ProfilePage from "src/modules/profile/containers/ProfilePage";

import NavBar from "src/components/NavBar";

const Router = augmentRouter(PreactRouter);

export default () => (
  <div>
    <Router history={history}>
      <LoginPage path="/login" default />
      <FeedPage path="/feed" />
      <GoalPage path="/goal" />
      <StatisticsPage path="/statistics" />
      <ProfilePage path="/profile" />
    </Router>
    <NavBar />
  </div>
);
