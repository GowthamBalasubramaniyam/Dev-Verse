import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (msg, alertType, timeOut = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
  };

  //this file handles the alert actions in Redux
// It exports a function setAlert that takes a message, alert type, and an optional timeout