import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authentication } from "src/modules/login/reducer";

const rootReducer = combineReducers({
  authentication
});
const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(
  rootReducer,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
