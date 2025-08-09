import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (msg, alertType, timeOut = 5000, position = "bottom-right") =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        alertType,
        id,
        position,
        timestamp: Date.now(),
      },
    });

    // Auto-remove after timeout
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
  };

// Manual dismiss function
export const dismissAlert = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
