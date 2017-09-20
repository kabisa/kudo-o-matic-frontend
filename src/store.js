import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({});

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default store;
