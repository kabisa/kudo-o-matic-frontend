import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { loadLogin, removeState, loadTeams } from "./localStorage";
import { authentication } from "src/modules/login/reducer";
import { goal } from "src/modules/goal/reducer";
import { feed } from "src/modules/feed/reducer";
import { transaction } from "./modules/transaction/reducer";
import { profile } from "./modules/profile/reducer";
import { statistics } from "./modules/statistics/reducer";
import { teams } from "./modules/teams/reducer";

const rootReducer = combineReducers({
  authentication,
  goal,
  feed,
  transaction,
  profile,
  statistics,
  teams
});
const middleware = applyMiddleware(thunkMiddleware);

const persistedStateLogin = loadLogin();
const persistedStateTeams = loadTeams();

const givePersistedState = () => {
  if (persistedStateLogin && persistedStateTeams) {
    return { authentication: persistedStateLogin.authentication, teams: persistedStateTeams.teams }
  } else {
    return undefined;
  }
}

const store = createStore(
  rootReducer,
  givePersistedState(),
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
