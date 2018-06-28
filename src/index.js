import "babel-polyfill";
import "./styles/shell.scss";
import { h, render } from "preact";
import { Provider } from "preact-redux";
import { Router as PreactRouter } from "preact-router";
import { route } from "preact-router";
import { history } from "src/support/history";
import { augmentRouter } from "src/support/pageTransitionSupport";
import App from "src/containers/App";

import FastClick from "fastclick";
import "src/config/sentry";
import store from "./store";
import LoginPage from "src/modules/login/containers/LoginPage";
import TeamsPage from "src/modules/teams/containers/TeamsPage";

const renderApp = function() {
  const root = document.querySelector("#maji-app");
  const Router = augmentRouter(PreactRouter);

  root.innerHTML = "";
  render(
    <Provider store={store}>
      <Router history={history}>
        <LoginPage path="/login" />
        <TeamsPage path="/teams" />
        <App default />
      </Router>
    </Provider>,
    root
  );
};

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("resume", onDeviceResume, false);

function onDeviceReady() {
  ThreeDeeTouch.configureQuickActions([
    {
      type: "kudos",
      title: "Give Kudos",
      subtitle: "Compose transaction",
      iconType: "Compose"
    }
  ]);

  ThreeDeeTouch.onHomeIconPressed = function(payload) {
    if (payload.type == "kudos") {
      route("/transaction", true);
    }
  };
}

function onDeviceResume() {
  window.FirebasePlugin.setBadgeNumber(0);
}

FastClick.attach(document.body);
renderApp();

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
