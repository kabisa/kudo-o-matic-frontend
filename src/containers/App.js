import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { augmentRouter } from "src/support/pageTransitionSupport";
import LoginPage from "src/modules/login/containers/LoginPage";

const Router = augmentRouter(PreactRouter);

export default () => (
  <Router history={history}>
    <LoginPage path="/login" default />
  </Router>
);
