import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

export default function alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

// This file handles the alert state in Redux
// It exports a reducer function that manages the alert state based on the action types SET_ALERT and REMOVE_ALERT