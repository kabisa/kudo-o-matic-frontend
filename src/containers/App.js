import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { augmentRouter } from "src/support/pageTransitionSupport";

const Router = augmentRouter(PreactRouter);

const App = () => <Router history={history} />;

export default App;
