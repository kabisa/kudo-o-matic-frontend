import "babel-polyfill";
import "./styles/shell.scss";
import { h, render } from "preact";
import { Provider } from "preact-redux";
import { Router as PreactRouter } from "preact-router";
import { route } from "preact-router";
import { history } from "src/support/history";
import { augmentRouter } from "src/support/pageTransitionSupport";

import FastClick from "fastclick";
import "src/config/sentry";
import store from "./store";
import LoginPage from "src/modules/login/containers/LoginPage";

const renderApp = function() {
  const App = require("./containers/App").default;
  const root = document.querySelector("#maji-app");
  const Router = augmentRouter(PreactRouter);

  root.innerHTML = "";
  render(
    <Provider store={store}>
      <Router history={history}>
        <LoginPage path="/login" />
        <App default />
      </Router>
    </Provider>,
    root
  );
};

FastClick.attach(document.body);
renderApp();

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  window.FirebasePlugin.hasPermission(function(data) {
    if (!data.isEnabled) {
      window.FirebasePlugin.grantPermission();
    }
  });

  window.FirebasePlugin.onNotificationOpen(function(notification) {
    window.FirebasePlugin.setBadgeNumber(0);

    switch (notification.event) {
      case "transaction":
        route("/feed", true);
        break;
      case "goal":
        route("/goal", true);
        break;
      case "reminder":
        route("/transaction", true);
        break;
    }
  });

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

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
