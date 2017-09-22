import "babel-polyfill";
import "./styles/shell.scss";
import { h, render } from "preact";
import { Provider } from "preact-redux";
import { Router as PreactRouter } from "preact-router";
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

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
