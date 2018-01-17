import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { loadLogin } from "./localStorage";
import { authentication } from "src/modules/login/reducer";
import { goal } from "src/modules/goal/reducer";
import { feed } from "src/modules/feed/reducer";
import { transaction } from "./modules/transaction/reducer";
import { profile } from "./modules/profile/reducer";
import { statistics } from "./modules/statistics/reducer";

const rootReducer = combineReducers({
  authentication,
  goal,
  feed,
  transaction,
  profile,
  statistics
});
const middleware = applyMiddleware(thunkMiddleware);

const persistedLogin = loadLogin();

const store = createStore(
  rootReducer,
  persistedLogin,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
