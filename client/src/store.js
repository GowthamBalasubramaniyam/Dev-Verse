// src/store.js
import { createStore, applyMiddleware } from "redux"; // CHANGED: configureStore to createStore
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension"; // CHANGED: redux-devtools/extension to @redux-devtools/extension
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  // CHANGED: configureStore to createStore
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
// This code sets up a Redux store for a React application. It imports necessary functions from Redux and Redux Thunk, applies middleware, and integrates with Redux DevTools for debugging. The root reducer is imported from a separate file, which combines all the reducers in the application. The store is then exported for use in the application.
